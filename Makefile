# LEXRAG Marketing Site - Development Makefile
# Convenient commands for development and building (deployment via GitHub Actions only)

.PHONY: help install dev build start clean lint format type-check ci analyze sitemap features readme docs debug-env debug-build quick-dev quick-build status ui-dev mobile-test commands deploy-test security-headers hydration-test cloudfront-setup s3-lifecycle smoke-test verify-cf smoke-test-curl setup-infrastructure

# Default target
help: ## Show help for all commands
	@echo "🚀 LEXRAG Marketing Site - Development Commands"
	@echo ""
	@echo "📦 Development:"
	@echo "  make install      - Install dependencies"
	@echo "  make dev          - Start dev server (port 3001)"
	@echo "  make build       - Build production version"
	@echo "  make start       - Start production server (port 3001)"
	@echo ""
	@echo "🧹 Maintenance:"
	@echo "  make clean       - Clean build caches"
	@echo "  make lint        - Check code with linter"
	@echo "  make format      - Format code with Prettier"
	@echo "  make type-check  - Check TypeScript types"
	@echo ""
	@echo "🔧 Utilities:"
	@echo "  make ci          - Run CI checks locally"
	@echo "  make analyze     - Analyze bundle size"
	@echo "  make sitemap     - Check sitemap"
	@echo "  make features    - Check generated features"
	@echo ""
	@echo "🚀 Deployment & Security:"
	@echo "  make deploy-test - Test deployment script locally (requires AWS CLI)"
	@echo "  make setup-infrastructure - Setup complete infrastructure (one command)"
	@echo "  make security-headers - Setup CloudFront security headers (requires AWS CLI)"
	@echo "  make cloudfront-setup - Setup CloudFront cache policies and behaviors (requires AWS CLI)"
	@echo "  make verify-cf - Verify CloudFront configuration (requires AWS CLI)"
	@echo "  make s3-lifecycle - Setup S3 lifecycle policies (requires AWS CLI)"
	@echo "  make smoke-test  - Run smoke tests against deployed site"
	@echo "  make smoke-test-curl - Run automated smoke tests with curl"
	@echo "  make hydration-test - Test hydration fixes"
	@echo ""
	@echo "⚠️  AWS CLI Required:"
	@echo "  Local deployment scripts require AWS CLI with S3/CloudFront permissions"
	@echo "  For production: Use GitHub Actions deployment (automatic on push to main)"
	@echo "  For local testing: Ensure AWS credentials are configured"
	@echo ""
	@echo "📅 Scheduled Jobs:"
	@echo "  CloudFront verification runs daily at 6 AM UTC via GitHub Actions"
	@echo "  Manual verification: GitHub Actions → verify_cloudfront → Run workflow"
	@echo ""
	@echo "📚 Documentation:"
	@echo "  make readme      - Open README in browser"
	@echo "  make docs        - Open documentation"
	@echo ""
	@echo "🚀 Deployment:"
	@echo "  Commit and push to main branch → Automatic deployment via GitHub Actions"

# =============================================================================
# 📦 Development Commands
# =============================================================================

install: ## Install dependencies
	@echo "📦 Installing dependencies..."
	npm ci

dev: ## Start dev server with Turbopack (port 3001)
	@echo "🚀 Starting development server on port 3001..."
	npm run dev

build: ## Build production version
	@echo "🏗️  Building production version..."
	npm run build

start: ## Start production server (port 3001)
	@echo "🚀 Starting production server on port 3001..."
	npm run start

# =============================================================================
# 🧹 Maintenance Commands
# =============================================================================

clean: ## Clean all build caches
	@echo "🧹 Cleaning build caches..."
	rm -rf .next/
	rm -rf out/
	rm -rf node_modules/.cache/
	rm -f tsconfig.tsbuildinfo
	@echo "✅ Clean completed"

lint: ## Check code with linter
	@echo "🔍 Running ESLint..."
	npm run lint

format: ## Format code with Prettier
	@echo "✨ Formatting code with Prettier..."
	npm run format

type-check: ## Check TypeScript types
	@echo "🔍 Checking TypeScript types..."
	npx tsc --noEmit

# =============================================================================
# 🔧 Utility Commands
# =============================================================================

ci: ## Run CI checks locally
	@echo "🔍 Running CI checks locally..."
	@echo "1️⃣ Installing dependencies..."
	npm ci
	@echo "2️⃣ Linting..."
	npm run lint
	@echo "3️⃣ Type checking..."
	npx tsc --noEmit
	@echo "4️⃣ Building..."
	npm run build
	@echo "✅ All CI checks passed!"

analyze: ## Analyze bundle size
	@echo "📊 Analyzing bundle size..."
	@if [ -d "out" ]; then \
		echo "📁 Build output size:"; \
		du -sh out/; \
		echo "📄 HTML files:"; \
		find out/ -name "*.html" -exec wc -l {} + | tail -1; \
		echo "📄 Generated features:"; \
		ls -la out/features/ | wc -l; \
	else \
		echo "❌ Build output not found. Run 'make build' first"; \
	fi

sitemap: ## Check sitemap
	@echo "🗺️  Checking sitemap..."
	@if [ -f "out/sitemap.xml" ]; then \
		echo "✅ Sitemap found:"; \
		cat out/sitemap.xml; \
	else \
		echo "❌ Sitemap not found. Run 'make build' first"; \
	fi

# =============================================================================
# 🚀 Deployment & Security Commands
# =============================================================================

deploy-test: ## Test deployment script locally
	@echo "🧪 Testing deployment script..."
	@if [ ! -f "scripts/deploy.sh" ]; then \
		echo "❌ Deployment script not found"; \
		exit 1; \
	fi
	@echo "✅ Deployment script exists and is executable"
	@echo "📝 To test with real AWS credentials:"
	@echo "   S3_BUCKET=s3://lexrag-site DISTRIBUTION_ID=your-dist-id \\"
	@echo "   NEXT_PUBLIC_APP_URL=https://app.lexrag.com \\"
	@echo "   NEXT_PUBLIC_BASE_URL=https://lexrag.com/ \\"
	@echo "   NEXT_PUBLIC_BASE_PATH= \\"
	@echo "   NEXT_PUBLIC_SEGMENT_ENABLED=true \\"
	@echo "   NEXT_PUBLIC_SEGMENT_WRITE_KEY=your-key \\"
	@echo "   NEXT_PUBLIC_SEGMENT_DEBUG=false \\"
	@echo "   NODE_ENV=production \\"
	@echo "   ./scripts/deploy.sh"
	@echo "   FORCE_DEPLOY=true ./scripts/deploy.sh  # Force override locks"

security-headers: ## Setup CloudFront security headers (requires AWS CLI)
	@echo "🔒 Setting up CloudFront security headers..."
	@if [ ! -f "scripts/cloudfront-headers.sh" ]; then \
		echo "❌ CloudFront headers script not found"; \
		exit 1; \
	fi
	@echo "📁 Loading DISTRIBUTION_ID from .env file..."
	@DISTRIBUTION_ID=$$(grep '^CLOUDFRONT_DISTRIBUTION_ID=' .env | cut -d'=' -f2) ./scripts/cloudfront-headers.sh

cloudfront-setup: ## Setup CloudFront cache policies and behaviors (requires AWS CLI)
	@echo "⚙️  Setting up CloudFront cache policies and behaviors..."
	@if [ ! -f "scripts/cloudfront-cache-policies.sh" ]; then \
		echo "❌ CloudFront cache policies script not found"; \
		exit 1; \
	fi
	@echo "📁 Loading DISTRIBUTION_ID from .env file..."
	@DISTRIBUTION_ID=$$(grep '^CLOUDFRONT_DISTRIBUTION_ID=' .env | cut -d'=' -f2) ./scripts/cloudfront-cache-policies.sh

verify-cf: ## Verify CloudFront configuration
	@echo "🔍 Verifying CloudFront configuration..."
	@if [ ! -f "scripts/verify-cloudfront-setup.sh" ]; then \
		echo "❌ CloudFront verification script not found"; \
		exit 1; \
	fi
	@echo "📁 Loading DISTRIBUTION_ID from .env file..."
	@DISTRIBUTION_ID=$$(grep '^CLOUDFRONT_DISTRIBUTION_ID=' .env | cut -d'=' -f2) ./scripts/verify-cloudfront-setup.sh

s3-lifecycle: ## Setup S3 lifecycle policies (requires AWS CLI)
	@echo "🔄 Setting up S3 lifecycle policies..."
	@if [ ! -f "scripts/s3-lifecycle.sh" ]; then \
		echo "❌ S3 lifecycle script not found"; \
		exit 1; \
	fi
	@echo "📁 Loading S3_BUCKET from .env file..."
	@S3_BUCKET=$$(grep '^S3_BUCKET=' .env | cut -d'=' -f2) ./scripts/s3-lifecycle.sh

setup-infrastructure: ## Setup complete infrastructure (security headers, cache policies, lifecycle, verification)
	@echo "🚀 Setting up complete LEXRAG infrastructure..."
	@echo ""
	@echo "📋 This will configure:"
	@echo "   1. CloudFront security headers (CSP, HSTS, etc.)"
	@echo "   2. CloudFront cache policies and behaviors"
	@echo "   3. S3 lifecycle policies for cleanup"
	@echo "   4. Verification of all configurations"
	@echo ""
	@echo "⚠️  Prerequisites:"
	@echo "   - AWS CLI configured with appropriate permissions"
	@echo "   - .env file with CLOUDFRONT_DISTRIBUTION_ID and S3_BUCKET"
	@echo ""
	@echo "📁 Creating setup script from .env variables..."
	@if [ ! -f ".env" ]; then \
		echo "❌ .env file not found. Please create it first:"; \
		echo "   cp env.example .env"; \
		echo "   # Edit .env with your values"; \
		exit 1; \
	fi
	@echo "#!/bin/bash" > /tmp/setup-infra.sh
	@echo "set -euo pipefail" >> /tmp/setup-infra.sh
	@echo "source .env" >> /tmp/setup-infra.sh
	@echo "" >> /tmp/setup-infra.sh
	@echo "echo '🔍 Checking required environment variables...'" >> /tmp/setup-infra.sh
	@echo "if [ -z \"\$$CLOUDFRONT_DISTRIBUTION_ID\" ]; then" >> /tmp/setup-infra.sh
	@echo "  echo '❌ CLOUDFRONT_DISTRIBUTION_ID not set in .env file'" >> /tmp/setup-infra.sh
	@echo "  echo '   Please add: CLOUDFRONT_DISTRIBUTION_ID=E1KNCYS7QKEZ5Q'" >> /tmp/setup-infra.sh
	@echo "  exit 1" >> /tmp/setup-infra.sh
	@echo "fi" >> /tmp/setup-infra.sh
	@echo "if [ -z \"\$$S3_BUCKET\" ]; then" >> /tmp/setup-infra.sh
	@echo "  echo '❌ S3_BUCKET not set in .env file'" >> /tmp/setup-infra.sh
	@echo "  echo '   Please add: S3_BUCKET=lexrag-site'" >> /tmp/setup-infra.sh
	@echo "  exit 1" >> /tmp/setup-infra.sh
	@echo "fi" >> /tmp/setup-infra.sh
	@echo "echo \"✅ DISTRIBUTION_ID: \$$CLOUDFRONT_DISTRIBUTION_ID\"" >> /tmp/setup-infra.sh
	@echo "echo \"✅ S3_BUCKET: \$$S3_BUCKET\"" >> /tmp/setup-infra.sh
	@echo "" >> /tmp/setup-infra.sh
	@echo "read -p 'Continue with these values? (y/N): ' confirm && [ \"\$$confirm\" = \"y\" ] || exit 0" >> /tmp/setup-infra.sh
	@echo "" >> /tmp/setup-infra.sh
	@echo "echo '🔒 Step 1/4: Setting up CloudFront security headers...'" >> /tmp/setup-infra.sh
	@echo "DISTRIBUTION_ID=\"\$$CLOUDFRONT_DISTRIBUTION_ID\" ./scripts/cloudfront-headers.sh" >> /tmp/setup-infra.sh
	@echo "" >> /tmp/setup-infra.sh
	@echo "echo '⚙️  Step 2/4: Setting up CloudFront cache policies and behaviors...'" >> /tmp/setup-infra.sh
	@echo "DISTRIBUTION_ID=\"\$$CLOUDFRONT_DISTRIBUTION_ID\" ./scripts/cloudfront-cache-policies.sh" >> /tmp/setup-infra.sh
	@echo "" >> /tmp/setup-infra.sh
	@echo "echo '🔄 Step 3/4: Setting up S3 lifecycle policies...'" >> /tmp/setup-infra.sh
	@echo "S3_BUCKET=\"\$$S3_BUCKET\" ./scripts/s3-lifecycle.sh" >> /tmp/setup-infra.sh
	@echo "" >> /tmp/setup-infra.sh
	@echo "echo '🔍 Step 4/4: Verifying all configurations...'" >> /tmp/setup-infra.sh
	@echo "DISTRIBUTION_ID=\"\$$CLOUDFRONT_DISTRIBUTION_ID\" ./scripts/verify-cloudfront-setup.sh" >> /tmp/setup-infra.sh
	@echo "" >> /tmp/setup-infra.sh
	@echo "echo '🎉 Infrastructure setup completed successfully!'" >> /tmp/setup-infra.sh
	@echo "echo ''" >> /tmp/setup-infra.sh
	@echo "echo '📊 What was configured:'" >> /tmp/setup-infra.sh
	@echo "echo '   ✅ CloudFront security headers (CSP, HSTS, X-Frame-Options, etc.)'" >> /tmp/setup-infra.sh
	@echo "echo '   ✅ CloudFront cache policies (static assets: 1 year, HTML: no cache)'" >> /tmp/setup-infra.sh
	@echo "echo '   ✅ CloudFront behaviors with compression enabled'" >> /tmp/setup-infra.sh
	@echo "echo '   ✅ S3 lifecycle policies for automatic cleanup'" >> /tmp/setup-infra.sh
	@echo "echo '   ✅ All configurations verified and working'" >> /tmp/setup-infra.sh
	@echo "" >> /tmp/setup-infra.sh
	@echo "echo '🌐 Your site is now secure and optimized!'" >> /tmp/setup-infra.sh
	@echo "echo '   Test with: curl -I https://lexrag.com/'" >> /tmp/setup-infra.sh
	@chmod +x /tmp/setup-infra.sh
	@echo "✅ Setup script created successfully!"
	@echo ""
	@echo "🚀 Executing setup script..."
	@/tmp/setup-infra.sh
	@rm -f /tmp/setup-infra.sh

smoke-test: ## Run smoke tests against deployed site
	@echo "🧪 Running smoke tests..."
	@echo "📊 Testing HTML headers..."
	@if curl -s -I https://lexrag.com/ | grep -q "content-security-policy"; then \
		echo "✅ Content-Security-Policy found"; \
	else \
		echo "❌ Content-Security-Policy not found"; \
	fi
	@if curl -s -I https://lexrag.com/ | grep -q "strict-transport-security"; then \
		echo "✅ HSTS found"; \
	else \
		echo "❌ HSTS not found"; \
	fi
	@if curl -s -I https://lexrag.com/ | grep -q "cache-control"; then \
		echo "✅ Cache-Control found"; \
	else \
		echo "❌ Cache-Control not found"; \
	fi
	@echo "📊 Testing static assets (first JS chunk)..."
	@if curl -s -I https://lexrag.com/_next/static/chunks/webpack.js | grep -q "cache-control"; then \
		echo "✅ Static asset Cache-Control found"; \
	else \
		echo "❌ Static asset Cache-Control not found"; \
	fi
	@echo "✅ Smoke tests completed!"

smoke-test-curl: ## Run automated smoke tests with curl
	@echo "🧪 Running automated smoke tests..."
	@echo "📊 Testing HTML headers..."
	@if curl -s -I "https://lexrag.com/" | grep -q "content-security-policy"; then \
		echo "✅ Content-Security-Policy found"; \
	else \
		echo "❌ Content-Security-Policy not found"; \
	fi
	@if curl -s -I "https://lexrag.com/" | grep -q "strict-transport-security"; then \
		echo "✅ HSTS found"; \
	else \
		echo "❌ HSTS not found"; \
	fi
	@if curl -s -I "https://lexrag.com/" | grep -q "cache-control"; then \
		echo "✅ Cache-Control found"; \
	else \
		echo "❌ Cache-Control not found"; \
	fi
	@echo "📊 Testing static assets (first JS chunk)..."
	@if curl -s -I "https://lexrag.com/_next/static/chunks/webpack.js" | grep -q "cache-control"; then \
		echo "✅ Static asset Cache-Control found"; \
	else \
		echo "❌ Static asset Cache-Control not found"; \
	fi
	@echo "✅ Automated smoke tests completed!"

hydration-test: ## Test hydration fixes
	@echo "🧪 Testing hydration fixes..."
	@echo "1️⃣ Building production version..."
	@make build
	@echo "2️⃣ Starting production server..."
	@echo "   Run: npm run start"
	@echo "3️⃣ Check browser console for hydration warnings"
	@echo "4️⃣ Navigate between pages to test client-side routing"
	@echo "5️⃣ Look for ClientOnly and dynamicClient usage in components"

# =============================================================================
# 📚 Documentation Commands
# =============================================================================

readme: ## Open README in browser
	@echo "📚 Opening README..."
	@if command -v open >/dev/null 2>&1; then \
		open README.md; \
	elif command -v xdg-open >/dev/null 2>&1; then \
		xdg-open README.md; \
	else \
		echo "📖 README.md content:"; \
		head -20 README.md; \
	fi

docs: ## Open documentation
	@echo "📚 Opening documentation..."
	@if [ -d "docs" ]; then \
		ls -la docs/; \
		if command -v open >/dev/null 2>&1; then \
			open docs/; \
		elif command -v xdg-open >/dev/null 2>&1; then \
			xdg-open docs/; \
		fi; \
	else \
		echo "📁 No docs directory found"; \
	fi

# =============================================================================
# 🔍 Debug Commands
# =============================================================================

debug: ## Debug build process
	@echo "🔍 Build debugging:"
	@echo "Node version: $$(node -v)"
	@echo "NPM version: $$(npm -v)"
	@echo "Next.js version: $$(npm list next)"
	@echo "Build directory exists: $$([ -d "out" ] && echo "✅" || echo "❌")"
	@echo "Next.js cache exists: $$([ -d ".next" ] && echo "✅" || echo "❌")"

# =============================================================================
# 📊 Status Commands
# =============================================================================

status: ## Show project status
	@echo "📊 Project Status:"
	@echo "📁 Node modules: $$([ -d "node_modules" ] && echo "✅" || echo "❌")"
	@echo "🏗️  Build output: $$([ -d "out" ] && echo "✅" || echo "❌")"
	@echo "🔥 Next.js cache: $$([ -d ".next" ] && echo "✅" || echo "❌")"
	@echo "🔍 Lint status: $$(npm run lint >/dev/null 2>&1 && echo "✅" || echo "❌")"
	@echo "📝 Type check: $$(npx tsc --noEmit >/dev/null 2>&1 && echo "✅" || echo "❌")"
	@echo "🚀 Deployment script: $$([ -f "scripts/deploy.sh" ] && echo "✅" || echo "❌")"
	@echo "🔒 Security headers script: $$([ -f "scripts/cloudfront-headers.sh" ] && echo "✅" || echo "❌")"
	@echo "⚙️  Cache policies script: $$([ -f "scripts/cloudfront-cache-policies.sh" ] && echo "✅" || echo "❌")"
	@echo "🔄 S3 lifecycle script: $$([ -f "scripts/s3-lifecycle.sh" ] && echo "✅" || echo "❌")"
	@echo "🔍 Verification script: $$([ -f "scripts/verify-cloudfront-setup.sh" ] && echo "✅" || echo "❌")"

	@echo "📏 Test breakpoints: sm(640px), md(768px), lg(1024px), xl(1280px)"

# =============================================================================
# 🔧 Advanced Commands
# =============================================================================

reset: ## Full project reset (DANGEROUS!)
	@echo "🚨 FULL PROJECT RESET - This will delete all build files!"
	@echo "⚠️  This action cannot be undone!"
	@read -p "Type 'RESET' to continue: " confirm; \
	if [ "$$confirm" = "RESET" ]; then \
		echo "🧹 Resetting project..."; \
		make clean; \
		rm -rf node_modules/; \
		rm -f package-lock.json; \
		echo "✅ Project reset completed"; \
		echo "🔄 Run 'make install' to reinstall dependencies"; \
	else \
		echo "❌ Reset cancelled"; \
	fi

# =============================================================================
# 📋 Help and Documentation
# =============================================================================

commands: ## Show all available commands
	@echo "📋 Available commands:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-20s\033[0m %s\n", $$1, $$2}'

# =============================================================================
# 🎯 Default Target
# =============================================================================

.DEFAULT_GOAL := help
