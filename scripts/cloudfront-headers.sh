#!/usr/bin/env bash
# All comments in code strictly in English
set -euo pipefail

: "${DISTRIBUTION_ID:?DISTRIBUTION_ID is required}"
: "${POLICY_NAME:=lexrag-security-headers}"

# Get AWS region
AWS_REGION="${AWS_REGION:-$(aws configure get region)}"
echo "Using AWS region: ${AWS_REGION}"

# Build headers JSON via heredoc (no expansion) using command substitution (avoids read -d '' + set -e issues)
HEADERS_JSON=$(cat <<'JSON'
{
  "Name": "lexrag-security-headers",
  "Comment": "Security headers including CSP/HSTS/etc for LEXRAG static site",
  "CorsConfig": {
    "AccessControlAllowOrigins": {
      "Quantity": 2,
      "Items": ["https://lexrag.com", "https://www.lexrag.com", "https://dev.lexrag.com"]
    },
    "AccessControlAllowHeaders": {
      "Quantity": 1,
      "Items": ["*"]
    },
    "AccessControlAllowMethods": {
      "Quantity": 3,
      "Items": ["GET", "HEAD", "OPTIONS"]
    },
    "AccessControlMaxAgeSec": 86400,
    "AccessControlAllowCredentials": false,
    "OriginOverride": true
  },
  "SecurityHeadersConfig": {
    "StrictTransportSecurity": {
      "Override": true,
      "IncludeSubdomains": true,
      "Preload": true,
      "AccessControlMaxAgeSec": 31536000
    },
    "ContentTypeOptions": { "Override": true },
    "FrameOptions": { "Override": true, "FrameOption": "DENY" },
    "ReferrerPolicy": { "Override": true, "ReferrerPolicy": "strict-origin-when-cross-origin" },
    "ContentSecurityPolicy": {
      "Override": true,
      "ContentSecurityPolicy": "default-src 'self'; script-src 'self' https://cdn.segment.com https://*.segment.com https://www.googletagmanager.com https://www.google-analytics.com https://static.hotjar.com https://script.hotjar.com https://snap.licdn.com https://googleads.g.doubleclick.net 'unsafe-inline'; connect-src 'self' https://api.segment.io https://*.segment.com https://www.google-analytics.com https://region1.google-analytics.com https://stats.g.doubleclick.net https://*.hotjar.com https://*.hotjar.io wss://*.hotjar.com https://*.linkedin.com https://*.licdn.com https://www.google.com https://analytics.google.com https://googleads.g.doubleclick.net https://*.doubleclick.net; img-src 'self' data: https: https://www.google-analytics.com https://stats.g.doubleclick.net https://*.hotjar.com https://*.hotjar.io https://px.ads.linkedin.com https://*.licdn.com; style-src 'self' 'unsafe-inline'; font-src 'self' data: https://lexrag.com https://*.cloudfront.net; base-uri 'self'; frame-ancestors 'none'; frame-src 'self' https://www.googletagmanager.com https://td.doubleclick.net https://*.doubleclick.net https://www.google.com; form-action 'self';"
    }
  }
}
JSON
)

echo "Creating (or updating) Response Headers Policy..."

# Create policy with unique name to avoid conflicts
TIMESTAMP=$(date +%s)
UNIQUE_POLICY_NAME="${POLICY_NAME}-${TIMESTAMP}"
echo "Creating policy with unique name: ${UNIQUE_POLICY_NAME}"

# Replace name field in JSON
UNIQUE_HEADERS_JSON=${HEADERS_JSON//lexrag-security-headers/${UNIQUE_POLICY_NAME}}

# Write JSON to a temp file and call AWS with file:// path
TMP_JSON_FILE=$(mktemp)
echo "${UNIQUE_HEADERS_JSON}" > "${TMP_JSON_FILE}"

POLICY_ID=$(aws cloudfront create-response-headers-policy \
  --response-headers-policy-config file://"${TMP_JSON_FILE}" \
  --query "ResponseHeadersPolicy.Id" --output text)

echo "✅ New policy created with ID: ${POLICY_ID}"
echo "Note: Policy created with name: ${UNIQUE_POLICY_NAME}"

# Save policy ID to scripts/.cloudfront-policy-id for other scripts to use
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
echo "${POLICY_ID}" > "${SCRIPT_DIR}/.cloudfront-policy-id"
echo "Policy ID saved to scripts/.cloudfront-policy-id for other scripts"

echo "Policy ID: ${POLICY_ID}"

echo "Attaching policy to CloudFront distribution behaviors..."
# Fetch current distribution config only (not wrapper), and its ETag
ETAG=$(aws cloudfront get-distribution-config --id "${DISTRIBUTION_ID}" --query 'ETag' --output text)
aws cloudfront get-distribution-config --id "${DISTRIBUTION_ID}" --query 'DistributionConfig' --output json > /tmp/cf.cfg.json

# Update DefaultCacheBehavior and, if present, all CacheBehaviors to use the new policy
jq --arg pid "${POLICY_ID}" '
  .DefaultCacheBehavior.ResponseHeadersPolicyId = $pid
  | ( .CacheBehaviors.Items? // [] ) as $items
  | if ($items | length) > 0 then .CacheBehaviors.Items |= map(.ResponseHeadersPolicyId = $pid) else . end
' /tmp/cf.cfg.json > /tmp/cf.cfg.updated.json

# Apply updated config
aws cloudfront update-distribution \
  --id "${DISTRIBUTION_ID}" \
  --if-match "${ETAG}" \
  --distribution-config file:///tmp/cf.cfg.updated.json >/dev/null

echo "✅ Policy attached. Waiting for CloudFront deployment (this can take a few minutes)..."

# Poll distribution status until Deployed or timeout
MAX_ATTEMPTS=${MAX_ATTEMPTS:-20}
SLEEP_SECONDS=${SLEEP_SECONDS:-15}
for ((i=1; i<=MAX_ATTEMPTS; i++)); do
  STATUS=$(aws cloudfront get-distribution --id "${DISTRIBUTION_ID}" --query 'Distribution.Status' --output text || echo "")
  echo "Attempt ${i}/${MAX_ATTEMPTS}: Status=${STATUS}"
  if [ "${STATUS}" = "Deployed" ]; then
    echo "✅ CloudFront status is Deployed"
    break
  fi
  sleep "${SLEEP_SECONDS}"
done

# Optional: verify header via curl if domain known
DOMAIN_HINT=${CLOUDFRONT_DOMAIN:-}
if [ -n "${DOMAIN_HINT}" ]; then
  echo "Verifying CSP header from https://${DOMAIN_HINT}/ ..."
  # Try up to 5 times with backoff
  for ((j=1; j<=5; j++)); do
    HDR=$(curl -sI "https://${DOMAIN_HINT}/" | grep -i "content-security-policy" || true)
    if [ -n "${HDR}" ]; then
      echo "CSP: ${HDR}"
      break
    fi
    echo "Header not visible yet, retry ${j}/5..."; sleep 5
  done
else
  echo "CLOUDFRONT_DOMAIN not set; skipping live CSP check."
fi

echo "🎉 Security headers policy created and attached successfully."
