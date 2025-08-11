#!/bin/bash

# Deploy script for LEXRAG Marketing Site
# This script builds the static site and deploys it to S3

set -e

echo "🚀 Starting deployment of LEXRAG Marketing Site..."

# Check if required environment variables are set
if [ -z "$CLOUDFRONT_DISTRIBUTION_ID" ]; then
    echo "❌ Error: CLOUDFRONT_DISTRIBUTION_ID environment variable is not set"
    echo "Please set it to your CloudFront distribution ID"
    exit 1
fi

if [ -z "$AWS_DEFAULT_REGION" ]; then
    echo "⚠️  Warning: AWS_DEFAULT_REGION is not set, using us-east-1"
    export AWS_DEFAULT_REGION=us-east-1
fi

# Build the static site
echo "📦 Building static site..."
npm run build

# Check if build was successful
if [ ! -d "out" ]; then
    echo "❌ Error: Build failed - 'out' directory not found"
    exit 1
fi

echo "✅ Build completed successfully"

# Deploy to S3
echo "🌐 Deploying to S3..."
aws s3 sync ./out/ s3://lexrag-marketing-site/ --delete

echo "✅ S3 sync completed"

# Invalidate CloudFront cache
echo "🔄 Invalidating CloudFront cache..."
aws cloudfront create-invalidation \
    --distribution-id "$CLOUDFRONT_DISTRIBUTION_ID" \
    --paths "/*"

echo "✅ CloudFront invalidation completed"

echo "🎉 Deployment completed successfully!"
echo "🌍 Your site should be available at: https://lexrag.com"
echo "⏱️  Changes may take a few minutes to propagate through CloudFront"
