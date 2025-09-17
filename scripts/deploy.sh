#!/usr/bin/env bash
# All comments in code strictly in English
set -euo pipefail

: "${S3_BUCKET:?S3_BUCKET is required (e.g., s3://lexrag-site)}"
: "${DISTRIBUTION_ID:?DISTRIBUTION_ID is required}"

# Set default values for Next.js and Segment variables if not provided
export NEXT_PUBLIC_APP_URL="${NEXT_PUBLIC_APP_URL:-https://app.lexrag.com}"
export NEXT_PUBLIC_BASE_URL="${NEXT_PUBLIC_BASE_URL:-https://lexrag.com/}"
export NEXT_PUBLIC_BASE_PATH="${NEXT_PUBLIC_BASE_PATH:-}"
export NEXT_PUBLIC_SEGMENT_ENABLED="${NEXT_PUBLIC_SEGMENT_ENABLED:-true}"
export NEXT_PUBLIC_SEGMENT_WRITE_KEY="${NEXT_PUBLIC_SEGMENT_WRITE_KEY:-8MIbGPXtsepP3Fw9BH1Kg27lp3dPTBWe}"
export NEXT_PUBLIC_SEGMENT_DEBUG="${NEXT_PUBLIC_SEGMENT_DEBUG:-false}"
export NODE_ENV="${NODE_ENV:-production}"
export ENVIRONMENT="${ENVIRONMENT:-production}"

BUILD_DIR="${BUILD_DIR:-out}"
LOCK_KEY="${LOCK_KEY:-s3-deploy.lock}"
TMP_DIR="$(mktemp -d)"
LOCK_TIMEOUT_MINUTES="${LOCK_TIMEOUT_MINUTES:-15}"
FORCE_DEPLOY="${FORCE_DEPLOY:-false}"

# --- Prevent parallel deployments ---
echo "Checking for deployment lock..."
if aws s3api head-object --bucket "$(echo "$S3_BUCKET" | sed 's#s3://##')" --key "$LOCK_KEY" >/dev/null 2>&1; then
    if [ "$FORCE_DEPLOY" = "true" ]; then
        echo "Force deploy enabled - removing existing lock..."
        aws s3api delete-object --bucket "$(echo "$S3_BUCKET" | sed 's#s3://##')" --key "$LOCK_KEY" >/dev/null 2>&1 || true
    else
        # Check lock age
        LOCK_TIME=$(aws s3api head-object --bucket "$(echo "$S3_BUCKET" | sed 's#s3://##')" --key "$LOCK_KEY" --query 'LastModified' --output text 2>/dev/null || echo "")
        if [ -n "$LOCK_TIME" ]; then
            LOCK_AGE_MINUTES=$(( ( $(date +%s) - $(date -d "$LOCK_TIME" +%s) ) / 60 ))
            if [ $LOCK_AGE_MINUTES -gt $LOCK_TIMEOUT_MINUTES ]; then
                echo "Lock is older than ${LOCK_TIMEOUT_MINUTES} minutes, removing stale lock..."
                aws s3api delete-object --bucket "$(echo "$S3_BUCKET" | sed 's#s3://##')" --key "$LOCK_KEY" >/dev/null 2>&1 || true
            else
                echo "Another deployment is in progress (lock found: $LOCK_KEY, age: ${LOCK_AGE_MINUTES}m). Aborting."
                echo "Use FORCE_DEPLOY=true to override or wait for lock to expire."
                exit 1
            fi
        fi
    fi
fi

# Create lock with timestamp and commit info
LOCK_CONTENT=$(cat <<EOF
{
    "timestamp": "$(date -u +%Y-%m-%dT%H:%M:%SZ)",
    "commit": "$(git rev-parse --short HEAD 2>/dev/null || echo 'unknown')",
    "deployment_id": "$(uuidgen 2>/dev/null || echo 'unknown')"
}
EOF
)

# Upload lock via stdin (AWS CLI v2 safe)
echo "$LOCK_CONTENT" | aws s3 cp - "$S3_BUCKET/$LOCK_KEY" \
  --content-type "application/json" \
  --only-show-errors >/dev/null

cleanup() {
  echo "Cleaning up lock..."
  aws s3api delete-object --bucket "$(echo "$S3_BUCKET" | sed 's#s3://##')" --key "$LOCK_KEY" >/dev/null 2>&1 || true
  rm -rf "$TMP_DIR" || true
}
trap cleanup EXIT

# --- Phase 0: Use pre-built output from CI ---
echo "Using prebuilt static site from '$BUILD_DIR'..."
if [ ! -d "$BUILD_DIR" ]; then
  echo "Error: build directory '$BUILD_DIR' not found. Ensure 'npm run build' ran in CI before deploy." >&2
  exit 1
fi

# --- Phase A: Upload hashed static assets first (no delete) ---
echo "Uploading hashed static assets..."
if [ -d "$BUILD_DIR/_next/static" ]; then
  aws s3 sync "$BUILD_DIR/_next/static" "$S3_BUCKET/_next/static" \
    --only-show-errors \
    --cache-control "public, max-age=31536000, immutable" \
    --metadata-directive REPLACE
  # Note: Let S3 infer Content-Type automatically for proper MIME types
  # This prevents issues with X-Content-Type-Options: nosniff
fi

# --- Phase B: Upload the rest with safe cache headers ---
echo "Uploading HTML with no-store..."
aws s3 sync "$BUILD_DIR" "$S3_BUCKET" \
  --only-show-errors \
  --exclude "*" --include "*.html" \
  --cache-control "no-store, must-revalidate" \
  --metadata-directive REPLACE \
  --delete

echo "Uploading JSON data with no-store (if any)..."
aws s3 sync "$BUILD_DIR" "$S3_BUCKET" \
  --only-show-errors \
  --exclude "*" --include "*.json" --include "_next/data/*" \
  --cache-control "no-store, must-revalidate" \
  --metadata-directive REPLACE \
  --delete

echo "Uploading assets (images/fonts) with moderate cache..."
aws s3 sync "$BUILD_DIR" "$S3_BUCKET" \
  --only-show-errors \
  --exclude "*.html" --exclude "*.json" --exclude "_next/static/*" \
  --cache-control "public, max-age=3600" \
  --metadata-directive REPLACE

# --- Invalidate HTML & data only (immutable static does not need it) ---
echo "Creating CloudFront invalidation..."
aws cloudfront create-invalidation \
  --distribution-id "$DISTRIBUTION_ID" \
  --paths "/*.html" "/index.html" "/_next/data/*" >/dev/null

echo "Deployment finished successfully."
