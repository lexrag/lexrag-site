#!/usr/bin/env bash
# All comments in code strictly in English
set -euo pipefail

: "${S3_BUCKET:?S3_BUCKET is required (e.g., lexrag-site)}"

echo "Setting up S3 Lifecycle Policies for LEXRAG..."

# --- Create Lifecycle Policy for old data files ---
echo "Creating lifecycle policy for old data files..."
LIFECYCLE_POLICY_JSON=$(cat <<EOF
{
  "Rules": [
    {
      "ID": "cleanup-old-data",
      "Status": "Enabled",
      "Filter": {
        "Prefix": "_next/data/"
      },
      "Expiration": {
        "Days": 60
      },
      "AbortIncompleteMultipartUpload": {
        "DaysAfterInitiation": 7
      }
    },
    {
      "ID": "cleanup-old-assets",
      "Status": "Enabled",
      "Filter": {
        "And": {
          "Prefix": "",
          "Tags": [
            {
              "Key": "type",
              "Value": "asset"
            }
          ]
        }
      },
      "Expiration": {
        "Days": 120
      }
    },
    {
      "ID": "cleanup-old-static",
      "Status": "Enabled",
      "Filter": {
        "Prefix": "_next/static/"
      },
      "Expiration": {
        "Days": 120
      },
      "AbortIncompleteMultipartUpload": {
        "DaysAfterInitiation": 7
      }
    },
    {
      "ID": "cleanup-incomplete-uploads",
      "Status": "Enabled",
      "Filter": {
        "Prefix": ""
      },
      "AbortIncompleteMultipartUpload": {
        "DaysAfterInitiation": 7
      }
    }
  ]
}
EOF
)

echo "Applying lifecycle policy to bucket: $S3_BUCKET"
aws s3api put-bucket-lifecycle-configuration \
  --bucket "$S3_BUCKET" \
  --lifecycle-configuration "$LIFECYCLE_POLICY_JSON"

echo "✅ S3 Lifecycle Policy applied successfully!"
echo ""
echo "📋 Lifecycle Rules:"
echo "  - _next/data/* → Expires after 60 days"
echo "  - _next/static/* → Expires after 120 days (safe for old chunks)"
echo "  - Assets with type=asset tag → Expires after 120 days"
echo "  - Incomplete multipart uploads → Aborted after 7 days"
echo ""
echo "💡 Note: Static assets in /_next/static/* are kept for 120 days to ensure"
echo "   old pages can still load their referenced chunks. This is safe because:"
echo "   - Chunks are immutable (Cache-Control: immutable)"
echo "   - CloudFront caches them for 1 year"
echo "   - Old chunks don't interfere with new deployments"
echo "   - Extended TTL prevents rare race conditions with long-lived client caches"
echo ""
echo "🔍 To monitor lifecycle actions:"
echo "   aws s3api get-bucket-lifecycle-configuration --bucket $S3_BUCKET"
