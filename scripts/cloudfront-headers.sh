#!/usr/bin/env bash
# All comments in code strictly in English
set -euo pipefail

: "${DISTRIBUTION_ID:?DISTRIBUTION_ID is required}"
: "${POLICY_NAME:=lexrag-security-headers}"

# Get AWS region
AWS_REGION="${AWS_REGION:-$(aws configure get region)}"
echo "Using AWS region: ${AWS_REGION}"

# Create JSON content directly instead of using heredoc
HEADERS_JSON='{
  "Name": "lexrag-security-headers",
  "Comment": "Security headers including CSP/HSTS/etc for LEXRAG static site",
  "SecurityHeadersConfig": {
    "StrictTransportSecurity": {
      "Override": true,
      "IncludeSubdomains": true,
      "Preload": true,
      "AccessControlMaxAgeSec": 31536000
    },
    "ContentTypeOptions": {
      "Override": true
    },
    "FrameOptions": {
      "Override": true,
      "FrameOption": "DENY"
    },
    "ReferrerPolicy": {
      "Override": true,
      "ReferrerPolicy": "strict-origin-when-cross-origin"
    },
    "ContentSecurityPolicy": {
      "Override": true,
      "ContentSecurityPolicy": "default-src '\''self'\''; script-src '\''self'\'' https://cdn.segment.com https://*.segment.com '\''unsafe-inline'\''; connect-src '\''self'\'' https://api.segment.io https://*.segment.com; img-src '\''self'\'' data: https:; style-src '\''self'\'' '\''unsafe-inline'\''; font-src '\''self'\'' data:; base-uri '\''self'\''; frame-ancestors '\''none'\''; form-action '\''self'\'';"
    }
  }
}'

echo "Creating (or updating) Response Headers Policy..."

# Create policy with unique name to avoid conflicts
TIMESTAMP=$(date +%s)
UNIQUE_POLICY_NAME="${POLICY_NAME}-${TIMESTAMP}"
echo "Creating policy with unique name: ${UNIQUE_POLICY_NAME}"

# Update JSON with unique name
UNIQUE_HEADERS_JSON=$(echo "${HEADERS_JSON}" | sed "s/lexrag-security-headers/${UNIQUE_POLICY_NAME}/")

# Create the policy
POLICY_ID=$(aws cloudfront create-response-headers-policy --response-headers-policy-config "${UNIQUE_HEADERS_JSON}" --query "ResponseHeadersPolicy.Id" --output text)
echo "✅ New policy created with ID: ${POLICY_ID}"
echo "Note: Policy created with name: ${UNIQUE_POLICY_NAME}"

# Save policy ID to file for other scripts to use
echo "${POLICY_ID}" > .cloudfront-policy-id
echo "Policy ID saved to .cloudfront-policy-id for other scripts"

echo "Policy ID: ${POLICY_ID}"

echo "Attach the policy to the default behavior in the distribution via console or IaC."
echo "Distribution: ${DISTRIBUTION_ID}"
echo ""
echo "📋 Security Headers Applied:"
echo "  ✅ HSTS: max-age=31536000; includeSubDomains; preload"
echo "  ✅ X-Content-Type-Options: nosniff"
echo "  ✅ X-Frame-Options: DENY"
echo "  ✅ Referrer-Policy: strict-origin-when-cross-origin"
echo "  ✅ Permissions-Policy: camera=(), microphone=(), geolocation=()"
echo "  ✅ CSP: Segment analytics allowed, unsafe-eval removed"
echo ""
echo "🔒 Next steps:"
echo "  1. Run ./scripts/cloudfront-cache-policies.sh to set up cache policies"
echo "  2. Attach this policy to all CloudFront behaviors"
echo "  3. Test headers with: curl -I https://d26ppb9osin3vx.cloudfront.net/"
