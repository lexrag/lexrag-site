# LEXRAG Marketing Site - Development Makefile
# Convenient commands for development and building (deployment via GitHub Actions only)

.PHONY: help install dev build start clean lint format type-check ci analyze sitemap features readme docs debug-env debug-build quick-dev quick-build status ui-dev mobile-test commands

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

features: ## Check generated features
	@echo "🔍 Checking generated features..."
	@if [ -d "out/features" ]; then \
		echo "📁 Features directory:"; \
		ls -la out/features/; \
		echo ""; \
		echo "📊 Total features: $$(ls -1 out/features/ | wc -l)"; \
		echo ""; \
		echo "📄 Sample feature page:"; \
		if [ -f "out/features/semantic-attributes/index.html" ]; then \
			echo "✅ semantic-attributes page exists"; \
			echo "📏 Size: $$(wc -c < out/features/semantic-attributes/index.html) bytes"; \
		else \
			echo "❌ semantic-attributes page not found"; \
		fi; \
	else \
		echo "❌ Features directory not found. Run 'make build' first"; \
	fi

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

debug-env: ## Show current environment variables
	@echo "🔍 Environment variables:"
	@echo "NODE_ENV: $${NODE_ENV:-not set}"
	@echo "NEXT_PUBLIC_BASE_URL: $${NEXT_PUBLIC_BASE_URL:-not set}"
	@echo "NEXT_PUBLIC_APP_URL: $${NEXT_PUBLIC_APP_URL:-not set}"
	@echo "NEXT_PUBLIC_SEGMENT_ENABLED: $${NEXT_PUBLIC_SEGMENT_ENABLED:-not set}"

debug-build: ## Debug build process
	@echo "🔍 Build debugging:"
	@echo "Node version: $$(node -v)"
	@echo "NPM version: $$(npm -v)"
	@echo "Next.js version: $$(npm list next)"
	@echo "Build directory exists: $$([ -d "out" ] && echo "✅" || echo "❌")"
	@echo "Next.js cache exists: $$([ -d ".next" ] && echo "✅" || echo "❌")"

# =============================================================================
# 🎯 Quick Actions
# =============================================================================

quick-dev: ## Quick development setup
	@echo "⚡ Quick development setup..."
	@if [ ! -d "node_modules" ]; then \
		make install; \
	fi
	make dev

quick-build: ## Quick build and check
	@echo "⚡ Quick build and check..."
	make build
	make analyze
	make features

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

# =============================================================================
# 🎨 UI Development
# =============================================================================

ui-dev: ## Start UI components in dev mode
	@echo "🎨 Starting UI development mode..."
	@echo "📱 Components available in components/ui/"
	@echo "🎨 Tailwind CSS is configured"
	@echo "🚀 Run 'make dev' to see changes"

# =============================================================================
# 📱 Mobile/Responsive Testing
# =============================================================================

mobile-test: ## Open site in mobile viewport
	@echo "📱 Opening site for mobile testing..."
	@echo "🌐 Dev server should be running on port 3001"
	@echo "📱 Use browser dev tools to simulate mobile devices"
	@echo "📏 Test breakpoints: sm(640px), md(768px), lg(1024px), xl(1280px)"

# =============================================================================
# 🔧 Advanced Commands
# =============================================================================

reset-all: ## Full project reset (DANGEROUS!)
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
