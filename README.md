# LEXRAG Marketing Site

Revolutionary legal research and analysis platform powered by GraphRAG technology.

## 🚀 Quick Start

### Prerequisites
- Node.js 22.x
- npm or yarn

### Installation
```bash
npm install
```

### Environment Setup

Create a `.env` file in the root directory with the following variables:

```bash
# App URLs
NEXT_PUBLIC_APP_URL=https://app.lexrag.com
NEXT_PUBLIC_APP_URL_DEV=http://localhost:3000

# Base URL for marketing site (CloudFront domain)
NEXT_PUBLIC_BASE_URL=https://d1wnoermrdhxcv.cloudfront.net
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

### Production Deployment

The site is configured for static export and deployment to S3 + CloudFront via GitHub Actions.

## 📁 Project Structure

- `app/` - Next.js app router pages
- `components/` - React components
- `lib/` - Utility functions and configurations
- `css/` - Global styles and themes
- `public/` - Static assets

## 🔧 Configuration

### App URLs
- **Production**: `https://app.lexrag.com`
- **Development**: `http://localhost:3000`

### Base URL
- **Production**: `https://d1wnoermrdhxcv.cloudfront.net` (CloudFront)
- **Development**: `http://localhost:3000`

### Analytics
- Uses Segment for analytics
- Beacon mode disabled for marketing site
- Production-ready configuration

## 🚀 Deployment

### GitHub Actions Workflow
- **File**: `.github/workflows/deploy.yml`
- **Target**: S3 + CloudFront
- **S3 Bucket**: `lexrag-site`
- **Distribution ID**: `E1D0DAN3LWZ4ER`

### Environment Variables in CI/CD
- `NEXT_PUBLIC_APP_URL`: Production app URL
- `NEXT_PUBLIC_BASE_URL`: CloudFront domain
- `NEXT_PUBLIC_SEGMENT_ENABLED`: Analytics enabled
- `NEXT_PUBLIC_ANALYTICS_VIA_BEACON`: Beacon disabled

### Required GitHub Secrets
- `AWS_ROLE_ARN`: `arn:aws:iam::110266626277:role/GitHubDeployRole`
- `NEXT_PUBLIC_SEGMENT_WRITE_KEY`: Your Segment write key

## 📊 Features

- **Homepage**: Hero section, benefits, use cases
- **Features**: Detailed feature descriptions
- **Technology**: GraphRAG technology overview
- **Company**: About us, mission, vision
- **Services**: Service offerings
- **FAQ**: Frequently asked questions

## 🎨 Design System

- **Framework**: Tailwind CSS
- **Components**: shadcn/ui
- **Icons**: Keenicons
- **Typography**: Instrument Sans
- **Theme**: Light/Dark mode support

## 📱 Responsive Design

- Mobile-first approach
- Optimized for all screen sizes
- Touch-friendly interactions
- Progressive Web App ready

## 🔍 SEO & Performance

- Static site generation
- Optimized images and assets
- Meta tags and structured data
- Sitemap and robots.txt
- Core Web Vitals optimization

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is proprietary software owned by LEXRAG.
