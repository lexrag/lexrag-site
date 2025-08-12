#!/usr/bin/env bash
# All comments in code strictly in English
set -euo pipefail

: "${DISTRIBUTION_ID:?DISTRIBUTION_ID is required}"

# Create temporary directory
TMP_DIR=$(mktemp -d)
trap 'rm -rf "$TMP_DIR"' EXIT

echo "Setting up CloudFront Cache Policies and Behaviors for LEXRAG..."

# --- Create Custom Cache Policy for Static Assets ---
echo "Creating custom cache policy for static assets..."
TIMESTAMP=$(date +%s)
STATIC_POLICY_NAME="lexrag-static-cache-policy-${TIMESTAMP}"
STATIC_CACHE_POLICY_JSON=$(cat <<'JSON'
{
  "Name": "STATIC_POLICY_NAME_PLACEHOLDER",
  "Comment": "Cache policy for /_next/static/* with long TTL and origin respect",
  "DefaultTTL": 31536000,
  "MaxTTL": 31536000,
  "MinTTL": 31536000,
  "ParametersInCacheKeyAndForwardedToOrigin": {
    "EnableAcceptEncodingGzip": true,
    "EnableAcceptEncodingBrotli": true,
    "HeadersConfig": {
      "HeaderBehavior": "none"
    },
    "QueryStringsConfig": {
      "QueryStringBehavior": "none"
    },
    "CookiesConfig": {
      "CookieBehavior": "none"
    }
  }
}
JSON
)

# Replace placeholder with actual name
STATIC_CACHE_POLICY_JSON=$(echo "$STATIC_CACHE_POLICY_JSON" | sed "s/STATIC_POLICY_NAME_PLACEHOLDER/$STATIC_POLICY_NAME/")

echo "Creating static cache policy with name: $STATIC_POLICY_NAME"
STATIC_CACHE_POLICY_ID=$(aws cloudfront create-cache-policy \
  --cache-policy-config "$STATIC_CACHE_POLICY_JSON" \
  --query 'CachePolicy.Id' --output text)
echo "✅ Static cache policy created with ID: $STATIC_CACHE_POLICY_ID"

# --- Create Custom Cache Policy for HTML/Data ---
echo "Creating custom cache policy for HTML and data..."
HTML_POLICY_NAME="lexrag-html-cache-policy-${TIMESTAMP}"
HTML_CACHE_POLICY_JSON=$(cat <<'JSON'
{
  "Name": "HTML_POLICY_NAME_PLACEHOLDER",
  "Comment": "Cache policy for HTML and /_next/data/* with no caching",
  "DefaultTTL": 0,
  "MaxTTL": 0,
  "MinTTL": 0,
  "ParametersInCacheKeyAndForwardedToOrigin": {
    "EnableAcceptEncodingGzip": false,
    "EnableAcceptEncodingBrotli": false,
    "HeadersConfig": {
      "HeaderBehavior": "none"
    },
    "QueryStringsConfig": {
      "QueryStringBehavior": "none"
    },
    "CookiesConfig": {
      "CookieBehavior": "none"
    }
  }
}
JSON
)

# Replace placeholder with actual name
HTML_CACHE_POLICY_JSON=$(echo "$HTML_CACHE_POLICY_JSON" | sed "s/HTML_POLICY_NAME_PLACEHOLDER/$HTML_POLICY_NAME/")

echo "Creating HTML cache policy with name: $HTML_POLICY_NAME"
HTML_CACHE_POLICY_ID=$(aws cloudfront create-cache-policy \
  --cache-policy-config "$HTML_CACHE_POLICY_JSON" \
  --query 'CachePolicy.Id' --output text)
echo "✅ HTML cache policy created with ID: $HTML_CACHE_POLICY_ID"

# --- Get Response Headers Policy ID ---
echo "Getting Response Headers Policy ID..."
# Read policy ID from file created by cloudfront-headers.sh
if [ -f ".cloudfront-policy-id" ]; then
  RESPONSE_HEADERS_POLICY_ID=$(cat .cloudfront-policy-id)
  echo "✅ Found Response Headers Policy ID from file: $RESPONSE_HEADERS_POLICY_ID"
else
  echo "❌ Response Headers Policy ID file not found. Run ./scripts/cloudfront-headers.sh first."
  exit 1
fi

if [ -z "$RESPONSE_HEADERS_POLICY_ID" ]; then
  echo "❌ Response Headers Policy ID is empty. Run ./scripts/cloudfront-headers.sh first."
  exit 1
fi

echo "Response Headers Policy ID: $RESPONSE_HEADERS_POLICY_ID"

# --- Get current distribution config ---
echo "Getting current distribution configuration..."
aws cloudfront get-distribution-config --id "$DISTRIBUTION_ID" > "$TMP_DIR/dist-config.json"

# --- Update behaviors ---
echo "Updating CloudFront behaviors..."

# Create updated config with proper behaviors
jq --arg static_policy "$STATIC_CACHE_POLICY_ID" \
   --arg html_policy "$HTML_CACHE_POLICY_ID" \
   --arg headers_policy "$RESPONSE_HEADERS_POLICY_ID" \
   '
   .DistributionConfig.CacheBehaviors = {
     "Quantity": 1,
     "Items": [
       {
         "PathPattern": "/_next/static/*",
         "TargetOriginId": .DistributionConfig.Origins.Items[0].Id,
         "ViewerProtocolPolicy": "redirect-to-https",
         "AllowedMethods": {
           "Quantity": 2,
           "Items": ["GET", "HEAD"],
           "CachedMethods": {
             "Quantity": 2,
             "Items": ["GET", "HEAD"]
           }
         },
         "CachePolicyId": $static_policy,
         "ResponseHeadersPolicyId": $headers_policy,
         "Compress": true,
         "SmoothStreaming": false,
         "FieldLevelEncryptionId": "",
         "LambdaFunctionAssociations": {
           "Quantity": 0
         },
         "FunctionAssociations": {
           "Quantity": 0
         },
         "TrustedKeyGroups": {
           "Enabled": false,
           "Quantity": 0
         },
         "TrustedSigners": {
           "Enabled": false,
           "Quantity": 0
         }
       }
     ]
   } |
   .DistributionConfig.DefaultCacheBehavior.CachePolicyId = $html_policy |
   .DistributionConfig.DefaultCacheBehavior.ResponseHeadersPolicyId = $headers_policy |
   .DistributionConfig.DefaultCacheBehavior.Compress = true |
   del(.DistributionConfig.DefaultCacheBehavior.MinTTL) |
   del(.DistributionConfig.DefaultCacheBehavior.MaxTTL) |
   del(.DistributionConfig.DefaultCacheBehavior.DefaultTTL) |
   del(.DistributionConfig.DefaultCacheBehavior.ForwardedValues) |
   del(.DistributionConfig.CacheBehaviors.Items[0].MinTTL) |
   del(.DistributionConfig.CacheBehaviors.Items[0].MaxTTL) |
   del(.DistributionConfig.CacheBehaviors.Items[0].DefaultTTL) |
   del(.DistributionConfig.CacheBehaviors.Items[0].ForwardedValues) |
   .DistributionConfig
   ' "$TMP_DIR/dist-config.json" > "$TMP_DIR/updated-config.json"

# --- Apply updated configuration ---
echo "Applying updated configuration..."
aws cloudfront update-distribution \
  --id "$DISTRIBUTION_ID" \
  --distribution-config file://"$TMP_DIR/updated-config.json" \
  --if-match "$(jq -r '.ETag' "$TMP_DIR/dist-config.json")" >/dev/null

echo "✅ CloudFront configuration updated successfully!"
echo ""
echo "📋 Summary of changes:"
echo "  - /_next/static/* → Static Cache Policy (1 year TTL)"
echo "  - /* (default) → HTML Cache Policy (no caching)"
echo "  - All behaviors → Security Headers Policy + Compression"
echo ""
echo "⚠️  Note: Changes may take 5-15 minutes to propagate globally."
echo "   Monitor the distribution status in CloudFront console."
