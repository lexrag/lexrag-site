# LEXRAG Marketing Site

## 🚀 Overview

This is a **static marketing website** built with Next.js App Router, configured for optimal performance and SEO. The site is designed for deployment to AWS S3 + CloudFront, providing instant loading and excellent search engine optimization.

### 🏗️ Architecture

- **Framework**: Next.js 15.3.3 with App Router
- **Build Output**: Static export (`output: 'export'`)
- **Deployment**: S3 + CloudFront (no server required)
- **Routing**: Static page generation with dynamic routes
- **Styling**: Tailwind CSS + shadcn/ui components

## 📁 Project Structure

```
lexrag-site/
├── app/                          # Next.js App Router
│   ├── (general)/               # Route groups
│   │   ├── features/            # Features listing page
│   │   │   └── [feature]/       # Dynamic feature pages
│   │   │       └── page.tsx     # Feature detail template
│   │   ├── technology/          # Technology pages
│   │   ├── use-cases/           # Use cases pages
│   │   └── ...                  # Other static pages
│   ├── layout.tsx               # Root layout with fonts
│   └── sitemap.ts               # Dynamic sitemap generation
├── components/                   # React components
│   ├── Features/                # Feature-related components
│   │   ├── FeaturesData.ts      # Feature definitions (17 features)
│   │   └── FeaturePageTemplate.tsx
│   └── ...                      # Other component categories
├── css/                         # Global styles and themes
├── public/                      # Static assets
└── out/                         # Build output (generated)
```

## 🔄 **SPA Routing & Static Generation**

### **How It Works:**

1. **Dynamic Routes**: `app/(general)/features/[feature]/page.tsx` defines a template for all feature pages
2. **Static Generation**: `generateStaticParams()` pre-generates all 17 feature pages at build time
3. **No Runtime Routing**: `dynamicParams: false` ensures no fallback pages are created
4. **Static Export**: `output: 'export'` creates actual HTML files for each route

### **Feature Generation Process:**

```typescript
// app/(general)/features/[feature]/page.tsx
export const dynamic = 'force-static';
export const dynamicParams = false;

export async function generateStaticParams() {
    return combinedFeaturesData.map((feature) => ({
        feature: feature.key, // e.g., 'semantic-attributes'
    }));
}
```

**Result**: Build creates `/features/semantic-attributes/index.html`, `/features/graph-visualization/index.html`, etc.

### **Why This Approach:**

- ✅ **SEO Optimized**: Each feature has its own URL and HTML file
- ✅ **Instant Loading**: No JavaScript routing, direct file access
- ✅ **Cost Effective**: S3 + CloudFront only, no server costs
- ✅ **Reliable**: Static files are bulletproof

## 🚀 Quick Start

### Prerequisites

- **Node.js**: 22.x (use `.nvmrc` for version management)
- **npm**: 10.x
- **AWS CLI**: Configured with appropriate permissions

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

### Makefile Commands

The project includes a comprehensive Makefile with convenient commands for development and building:

#### 🎯 **Essential Commands**
```bash
make help          # Show all available commands
make dev           # Start dev server (port 3001)
make build         # Build production version
make clean         # Clean build caches
```

#### 🔧 **Development Tools**
```bash
make lint          # Run ESLint
make format        # Format code with Prettier
make type-check    # Check TypeScript types
make ci            # Run CI checks locally
```

#### 📊 **Analysis & Debugging**
```bash
make status        # Show project status
make analyze       # Analyze bundle size
make features      # Check generated features
make debug-env     # Show environment variables
```

#### ⚡ **Quick Actions**
```bash
make quick-dev     # Quick development setup
make quick-build   # Quick build and check
```

**💡 Pro tip**: Run `make help` to see all available commands with descriptions!

**🚀 Deployment**: All deployments happen automatically via GitHub Actions when you commit and push to the main branch.

### Environment Setup

Create a `.env` file in the root directory:

```bash
# App URLs
NEXT_PUBLIC_APP_URL=https://app.lexrag.com
NEXT_PUBLIC_APP_URL_DEV=http://localhost:3000

# Base URL for marketing site (CloudFront domain)
NEXT_PUBLIC_BASE_URL=https://d26ppb9osin3vx.cloudfront.net
NEXT_PUBLIC_BASE_PATH=

# Analytics configuration
NEXT_PUBLIC_ANALYTICS_VIA_BEACON=false
NEXT_PUBLIC_SEGMENT_ENABLED=true
NEXT_PUBLIC_SEGMENT_WRITE_KEY=YOUR_SEGMENT_WRITE_KEY_HERE
NEXT_PUBLIC_SEGMENT_DEBUG=false

# Build Configuration
NODE_ENV=production
```

### Development
```bash
npm run dev
```

### Build
```bash
npm run build
```

## 🏗️ Build Process

### What Happens During Build:

1. **Static Generation**: Next.js generates 35 static pages
2. **Feature Pages**: 17 feature pages created from `FeaturesData.ts`
3. **Asset Optimization**: Images, CSS, JS optimized for production
4. **Export**: All files placed in `out/` directory

### Build Output Structure:
```
out/
├── index.html                    # Homepage
├── features/                     # Features section
│   ├── semantic-attributes/     # Feature page
│   │   └── index.html
│   ├── graph-visualization/     # Feature page
│   │   └── index.html
│   └── ...                      # 15 more features
├── technology/graphrag/          # Technology page
├── use-cases/                   # Use cases page
└── ...                          # Other static pages
```

### Verification:
```bash
# Check all features were generated
ls -la out/features/
# Should show 16 folders + index.html = 17 total

# Check specific feature
ls -la out/features/semantic-attributes/
# Should contain index.html
```

## 🌐 Deployment

### Automated Deployment (GitHub Actions) - RECOMMENDED

The site is configured for automated deployment via GitHub Actions:

- **Workflow**: `.github/workflows/deploy.yml`
- **Target**: S3 + CloudFront
- **S3 Bucket**: `lexrag-site`
- **Distribution ID**: `E1KNCYS7QKEZ5Q`
- **Trigger**: Automatic on push to main branch

**Use GitHub Actions for:**
- ✅ **Regular deployments** from main branch
- ✅ **Production releases** with full CI/CD pipeline
- ✅ **Team collaboration** with deployment history
- ✅ **Automated testing** before deployment

### Deployment Process

1. **Commit and Push**: Make changes and push to main branch
2. **Automated Build**: GitHub Actions builds the static site
3. **Quality Checks**: Linting, type checking, and build verification
4. **S3 Upload**: Static files are uploaded to S3 bucket
5. **CloudFront Update**: Cache invalidation for immediate updates
6. **Live Site**: Changes are live at https://lexrag.com

**No manual deployment needed** - everything happens automatically!

## 🔧 Development Workflow

### Adding New Features:

1. **Add Feature Data**: Edit `components/Features/FeaturesData.ts`
2. **Feature Auto-Generated**: Next build will create the new feature page
3. **No Code Changes**: Routing automatically handles new features

### Adding New Pages:

1. **Create Route**: Add new folder in `app/(general)/`
2. **Add page.tsx**: Create the page component
3. **Build**: Page will be included in static export

### Code Quality:

```bash
# Lint code
npm run lint

# Type check
npm run type-check

# Build test
npm run build
```

## 📊 Features & Content

### Current Features (17 total):
- **Search Category**: Graph Visualization, Semantic Attributes, Semantic Graph, Full Semantic Search
- **Query Category**: Legal Breakdown, Base Query, Advanced Query, Interactive Model
- **Storage Category**: Contexts Management, Dossier Compilation, Document Upload, On-premises LLM
- **Analytics Category**: Base Analytics, Judicial Analytics, Legislative Analytics, Full Analytics

### Content Management:
- **Features**: Defined in `components/Features/FeaturesData.ts`
- **Static Pages**: Standard Next.js pages in `app/` directory
- **Assets**: Images, icons, and media in `public/` folder

## 🎨 Design System

- **Framework**: Tailwind CSS
- **Components**: shadcn/ui
- **Icons**: Keenicons
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
- **Sitemap**: Auto-generated from `FeaturesData.ts`
- **Performance**: Core Web Vitals optimization
- **CDN**: CloudFront global distribution

## 🐛 Troubleshooting

### Common Issues:

#### Problem: Feature pages show 404 on S3
**Solution**: Ensure S3 Static Website Hosting is enabled with correct index/error documents

#### Problem: Build doesn't generate all features
**Solution**: Check `generateStaticParams()` in feature page template

#### Problem: CloudFront shows 404
**Solution**: Configure CloudFront error pages to redirect to `/index.html`

### Debug Commands:
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
4. **Deployment is simple** - just S3 + CloudFront
5. **SEO is built-in** - each page has its own URL and HTML file

The architecture provides the best of both worlds: modern React development experience with static site performance and SEO benefits.
