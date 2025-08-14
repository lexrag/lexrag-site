# LEXRAG Marketing Site

## 🚀 Overview

A **static marketing website** built with Next.js App Router, optimized for performance and SEO. Deployed to AWS S3 + CloudFront for instant loading and excellent search engine optimization.

### 🏗️ Architecture

- **Framework**: Next.js 15.3.3 with App Router
- **Build Output**: Static export (`output: 'export'`)
- **Deployment**: S3 + CloudFront (no server required)
- **Styling**: Tailwind CSS + shadcn/ui components
- **Analytics**: Segment (configured as public)

## 📁 Project Structure

```
lexrag-site/
├── app/                          # Next.js App Router
│   ├── (general)/               # Route groups
│   │   ├── features/            # Features listing & dynamic pages
│   │   ├── technology/          # Technology pages
│   │   ├── use-cases/           # Use cases pages
│   │   └── ...                  # Other static pages
│   ├── layout.tsx               # Root layout
│   └── sitemap.ts               # Dynamic sitemap generation
├── components/                   # React components
├── css/                         # Global styles and themes
├── public/                      # Static assets
└── out/                         # Build output (generated)
```

## 🚀 Quick Start

### Prerequisites

- **Node.js**: 22.x (use `.nvmrc`)
- **npm**: 10.x

### Development Workflow

```bash
# 1. Install dependencies
make install

# 2. Start development server
make dev

# 3. Build for production
make build

# 4. Deploy to production
make deploy
```

## 🔧 Development Commands

### Essential Commands

```bash
make help          # Show all available commands
make dev           # Start dev server (port 3001)
make build         # Build production version
make clean         # Clean build caches
```

### Development Tools

```bash
make lint          # Run ESLint
make format        # Format code with Prettier
make type-check    # Check TypeScript types
make ci            # Run CI checks locally
```

### Analysis & Debugging

```bash
make status        # Show project status
make analyze       # Analyze bundle size
make debug         # Debug build process
```

**💡 Pro tip**: Run `make help` to see all available commands!

## 🚀 Deployment

### Automated Deployment (GitHub Actions) - RECOMMENDED

The site is configured for automated deployment via GitHub Actions:

- **Workflow**: `.github/workflows/deploy.yml`
- **Trigger**: Automatic on push to main branch

**No manual deployment needed** - everything happens automatically!

### Local Deployment (Optional)

```bash
# Only works if you have AWS CLI configured
make deploy
```

## 🔒 Security & Performance

### Security Features

- **CSP**: Configured for Segment Analytics
- **HSTS**: Strict Transport Security
- **X-Frame-Options**: Clickjacking protection
- **X-Content-Type-Options**: MIME type sniffing protection

### CloudFront Response Headers (CSP + CORS)

- Response Headers Policy applied via scripts sets:
  - Content-Security-Policy including: `font-src 'self' data: https://lexrag.com https://*.cloudfront.net`
  - CORS for cross-origin fonts/assets: `Access-Control-Allow-Origin: https://lexrag.com` and `https://www.lexrag.com`
  - HSTS, Referrer-Policy, X-Frame-Options, X-Content-Type-Options

### Caching Strategy

- **Static Assets** (`/_next/static/*`): Long-term cache
- **HTML/JSON**: No cache (always fresh)
- **Images/Fonts**: Moderate cache

## 🧪 Testing & Quality

### Quality Checks

```bash
# Run all quality checks
make ci

# Individual checks
make lint          # Code quality
make type-check    # Type safety
make build         # Build verification
```

### Smoke Tests

```bash
make smoke-test        # Manual smoke tests
make smoke-test-curl   # Automated smoke tests
```

## 🛠️ Operations (S3 + CloudFront) — Quick checklist

Use these steps for domain/headers/cache updates without changing anything beyond S3 and CloudFront.

1) Headers policy (CSP + CORS)
- Prereq: `.env` has `CLOUDFRONT_DISTRIBUTION_ID`
- Apply/update headers policy and attach to behaviors:
```bash
make security-headers
```

2) Cache policies and behaviors
- Create long‑TTL for `/_next/static/*` and no‑cache for HTML/data; attach headers and enable compression:
```bash
make cloudfront-setup
```

3) Build with the desired public base URL for assets
- Prefer serving assets from the primary domain:
```bash
NEXT_PUBLIC_BASE_URL=https://lexrag.com/ NODE_ENV=production npm run build
```

4) Deploy to S3 + invalidate HTML/data in CloudFront
```bash
S3_BUCKET=s3://lexrag-site DISTRIBUTION_ID=$CLOUDFRONT_DISTRIBUTION_ID \
NEXT_PUBLIC_BASE_URL=https://lexrag.com/ NODE_ENV=production \
./scripts/deploy.sh
```

5) Verify CloudFront config and runtime headers
```bash
make verify-cf
make smoke-test
# Optional: check CORS on an asset
curl -sI -H "Origin: https://lexrag.com" \
  https://lexrag.com/_next/static/chunks/webpack.js | cat
```

Notes
- Errors like `ERR_BLOCKED_BY_CLIENT` on `px.ads.linkedin.com` are from ad blockers, not infra issues.
- Only S3/CloudFront changes are required for headers/cache/CORS.

## 📋 When requesting similar changes later, provide

- CloudFront distribution ID and site domain (e.g., `lexrag.com`)
- Target S3 bucket (e.g., `s3://lexrag-site`)
- Desired `NEXT_PUBLIC_BASE_URL` for assets (e.g., `https://lexrag.com/`)
- Any extra allowed origins for CORS (if different from `lexrag.com/www`)
- Third‑party domains to include in CSP (analytics, tag managers, etc.)

### Code Quality

```bash
# Lint code
npm run lint

# Type check
npm run type-check

# Build test
npm run build
```

## 🎨 Design System

- **Framework**: Tailwind CSS
- **Components**: shadcn/ui
- **Icons**: Keenicons + Lucide React
- **Typography**: Instrument Sans (via next/font)
- **Theme**: Light/Dark mode support

## 📱 Responsive Design

- Mobile-first approach
- Optimized for all screen sizes
- Touch-friendly interactions
- Progressive Web App ready

## 🔍 SEO & Performance

- **Static Generation**: All pages pre-generated at build time
- **Meta Tags**: Dynamic meta tags for each feature
- **Sitemap**: Auto-generated from feature data
- **Performance**: Core Web Vitals optimization
- **CDN**: CloudFront global distribution

## 🐛 Troubleshooting

### Common Issues

#### Problem: Build doesn't generate all features

**Solution**: Check `generateStaticParams()` in feature page template

#### Problem: Hydration mismatches

**Solution**: Use `ClientOnly` wrapper for DOM-mutating components

### Debug Commands

```bash
# Check build output
ls -la out/features/

# Verify specific feature
ls -la out/features/semantic-attributes/

# Check sitemap generation
cat out/sitemap.xml
```

## 📈 Performance Benefits

- ⚡ **Instant Loading**: All pages pre-generated
- 🔍 **SEO Optimized**: Each feature has its own URL
- 💰 **Cost Effective**: S3 + CloudFront only
- 🚀 **Scalable**: No server dependencies
- 🛡️ **Reliable**: Static files are bulletproof

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly (`npm run build`)
5. Submit a pull request

## 📄 License

This project is proprietary software owned by LEXRAG.

---

## 🎯 **Key Takeaways for Developers**

1. **This is NOT a traditional SPA** - it's a statically generated site
2. **All routing happens at build time** - no client-side routing
3. **Features are auto-generated** from `FeaturesData.ts`
4. **Deployment is automated** via GitHub Actions
5. **Security is built-in** via CloudFront policies
6. **Performance is optimized** via smart caching strategies

The architecture provides the best of both worlds: modern React development experience with static site performance and SEO benefits.
