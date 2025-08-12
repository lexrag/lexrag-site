#!/usr/bin/env bash
# All comments in code strictly in English
set -euo pipefail

: "${DISTRIBUTION_ID:?DISTRIBUTION_ID is required}"

echo "🔍 Verifying CloudFront configuration for LEXRAG..."

# --- Get distribution configuration ---
echo "Getting distribution configuration..."
aws cloudfront get-distribution-config --id "$DISTRIBUTION_ID" > /tmp/dist-config.json

# --- Check default behavior ---
echo ""
echo "📋 Default Behavior (/*):"
DEFAULT_CACHE_POLICY=$(jq -r '.DistributionConfig.DefaultCacheBehavior.CachePolicyId' /tmp/dist-config.json)
DEFAULT_HEADERS_POLICY=$(jq -r '.DistributionConfig.DefaultCacheBehavior.ResponseHeadersPolicyId // "None"' /tmp/dist-config.json)
DEFAULT_COMPRESS=$(jq -r '.DistributionConfig.DefaultCacheBehavior.Compress' /tmp/dist-config.json)

echo "  Cache Policy ID: $DEFAULT_CACHE_POLICY"
echo "  Response Headers Policy ID: $DEFAULT_HEADERS_POLICY"
echo "  Compression: $DEFAULT_COMPRESS"

# Get cache policy details
if [ "$DEFAULT_CACHE_POLICY" != "None" ]; then
    CACHE_POLICY_NAME=$(aws cloudfront get-cache-policy --id "$DEFAULT_CACHE_POLICY" --query 'CachePolicy.CachePolicyConfig.Name' --output text 2>/dev/null || echo "Unknown")
    echo "  Cache Policy Name: $CACHE_POLICY_NAME"
    
    # Check TTL settings for default behavior
    DEFAULT_TTL=$(aws cloudfront get-cache-policy --id "$DEFAULT_CACHE_POLICY" --query 'CachePolicy.CachePolicyConfig.DefaultTTL' --output text 2>/dev/null || echo "Unknown")
    echo "  Default TTL: $DEFAULT_TTL seconds"
    
    # Verify TTL is 0 for HTML/data
    if [ "$DEFAULT_TTL" = "0" ]; then
        echo "  ✅ TTL is 0 (correct for HTML/data)"
    else
        echo "  ⚠️  TTL should be 0 for HTML/data (current: $DEFAULT_TTL)"
    fi
fi

# Get headers policy details
if [ "$DEFAULT_HEADERS_POLICY" != "None" ]; then
    HEADERS_POLICY_NAME=$(aws cloudfront get-response-headers-policy --id "$DEFAULT_HEADERS_POLICY" --query 'ResponseHeadersPolicy.ResponseHeadersPolicyConfig.Name' --output text 2>/dev/null || echo "Unknown")
    echo "  Headers Policy Name: $HEADERS_POLICY_NAME"
fi

# --- Check static assets behavior ---
echo ""
echo "📋 Static Assets Behavior (/_next/static/*):"
STATIC_BEHAVIOR=$(jq -r '.DistributionConfig.CacheBehaviors.Items[] | select(.PathPattern == "/_next/static/*") | .CachePolicyId // "Not found"' /tmp/dist-config.json)

if [ "$STATIC_BEHAVIOR" != "Not found" ]; then
    echo "  Cache Policy ID: $STATIC_BEHAVIOR"
    
    # Get cache policy details
    STATIC_CACHE_POLICY_NAME=$(aws cloudfront get-cache-policy --id "$STATIC_BEHAVIOR" --query 'CachePolicy.CachePolicyConfig.Name' --output text 2>/dev/null || echo "Unknown")
    echo "  Cache Policy Name: $STATIC_CACHE_POLICY_NAME"
    
    # Check TTL settings
    STATIC_TTL=$(aws cloudfront get-cache-policy --id "$STATIC_BEHAVIOR" --query 'CachePolicy.CachePolicyConfig.DefaultTTL' --output text 2>/dev/null || echo "Unknown")
    echo "  Default TTL: $STATIC_TTL seconds"
    
    # Check compression
    STATIC_COMPRESS=$(jq -r '.DistributionConfig.CacheBehaviors.Items[] | select(.PathPattern == "/_next/static/*") | .Compress' /tmp/dist-config.json)
    echo "  Compression: $STATIC_COMPRESS"
    
    # Check headers policy
    STATIC_HEADERS_POLICY=$(jq -r '.DistributionConfig.CacheBehaviors.Items[] | select(.PathPattern == "/_next/static/*") | .ResponseHeadersPolicyId // "None"' /tmp/dist-config.json)
    if [ "$STATIC_HEADERS_POLICY" != "None" ]; then
        STATIC_HEADERS_NAME=$(aws cloudfront get-response-headers-policy --id "$STATIC_HEADERS_POLICY" --query 'ResponseHeadersPolicy.ResponseHeadersPolicyConfig.Name' --output text 2>/dev/null || echo "Unknown")
        echo "  Headers Policy: $STATIC_HEADERS_NAME"
    else
        echo "  Headers Policy: None (⚠️  Security headers not applied to static assets)"
    fi
else
    echo "  ❌ Static assets behavior not found!"
    echo "  Run ./scripts/cloudfront-cache-policies.sh to create it"
fi

# --- Check security headers policy ---
echo ""
echo "🔒 Security Headers Policy:"
if [ "$DEFAULT_HEADERS_POLICY" != "None" ]; then
    # Get security headers configuration
    HEADERS_CONFIG=$(aws cloudfront get-response-headers-policy --id "$DEFAULT_HEADERS_POLICY" --query 'ResponseHeadersPolicy.ResponseHeadersPolicyConfig.SecurityHeadersConfig' --output json 2>/dev/null || echo "{}")
    
    echo "  Applied headers:"
    
    # Check for specific security headers
    if echo "$HEADERS_CONFIG" | jq -r '.StrictTransportSecurity // empty' | grep -q "AccessControlMaxAgeSec"; then
        echo "    ✅ HSTS: max-age=$(echo "$HEADERS_CONFIG" | jq -r '.StrictTransportSecurity.AccessControlMaxAgeSec // "unknown"') seconds"
    else
        echo "    ❌ HSTS header missing"
    fi
    
    if echo "$HEADERS_CONFIG" | jq -r '.ContentTypeOptions // empty' | grep -q "Override"; then
        echo "    ✅ X-Content-Type-Options: nosniff"
    else
        echo "    ❌ X-Content-Type-Options missing"
    fi
    
    if echo "$HEADERS_CONFIG" | jq -r '.FrameOptions // empty' | grep -q "FrameOption"; then
        FRAME_OPTION=$(echo "$HEADERS_CONFIG" | jq -r '.FrameOptions.FrameOption // "unknown"')
        echo "    ✅ X-Frame-Options: $FRAME_OPTION"
    else
        echo "    ❌ X-Frame-Options missing"
    fi
    
    if echo "$HEADERS_CONFIG" | jq -r '.ReferrerPolicy // empty' | grep -q "ReferrerPolicy"; then
        REFERRER_POLICY=$(echo "$HEADERS_CONFIG" | jq -r '.ReferrerPolicy.ReferrerPolicy // "unknown"')
        echo "    ✅ Referrer-Policy: $REFERRER_POLICY"
    else
        echo "    ❌ Referrer-Policy missing"
    fi
    
    if echo "$HEADERS_CONFIG" | jq -r '.ContentSecurityPolicy // empty' | grep -q "ContentSecurityPolicy"; then
        echo "    ✅ Content-Security-Policy: configured"
    else
        echo "    ❌ Content-Security-Policy missing"
    fi
else
    echo "  ❌ No security headers policy applied!"
    echo "  Run ./scripts/cloudfront-headers.sh to create it"
fi

# --- Summary and recommendations ---
echo ""
echo "📊 Configuration Summary:"
echo ""

# Check if everything is properly configured
ISSUES=0

if [ "$STATIC_BEHAVIOR" = "Not found" ]; then
    echo "❌ Static assets behavior missing"
    ISSUES=$((ISSUES + 1))
fi

if [ "$DEFAULT_HEADERS_POLICY" = "None" ]; then
    echo "❌ Security headers not applied to default behavior"
    ISSUES=$((ISSUES + 1))
fi

if [ "$STATIC_HEADERS_POLICY" = "None" ] && [ "$STATIC_BEHAVIOR" != "Not found" ]; then
    echo "⚠️  Security headers not applied to static assets behavior"
    ISSUES=$((ISSUES + 1))
fi

if [ "$DEFAULT_COMPRESS" != "true" ]; then
    echo "⚠️  Compression not enabled on default behavior"
    ISSUES=$((ISSUES + 1))
fi

if [ "$STATIC_COMPRESS" != "true" ] && [ "$STATIC_BEHAVIOR" != "Not found" ]; then
    echo "⚠️  Compression not enabled on static assets behavior"
    ISSUES=$((ISSUES + 1))
fi

if [ $ISSUES -eq 0 ]; then
    echo "✅ All configurations are properly set up!"
else
    echo ""
    echo "🔧 To fix issues, run:"
    echo "  1. ./scripts/cloudfront-headers.sh"
    echo "  2. ./scripts/cloudfront-cache-policies.sh"
    echo "  3. Wait for distribution to deploy"
    echo "  4. Run this script again to verify"
fi

# Cleanup
rm -f /tmp/dist-config.json

echo ""
echo "💡 Note: Changes may take 5-15 minutes to propagate globally."
echo "   Monitor the distribution status in CloudFront console."
