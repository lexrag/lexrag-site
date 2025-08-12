// All comments in code strictly in English
import { execSync } from 'node:child_process';
import path from 'node:path';

/** @type {import('next').NextConfig} */
const nextConfig = {
    basePath: process.env.NEXT_PUBLIC_BASE_PATH || undefined,
    images: {
        unoptimized: true,
    },
    output: 'export',
    trailingSlash: true,
    reactStrictMode: false,
    devIndicators: false,
    assetPrefix: process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_BASE_URL : '',
    poweredByHeader: false,
    productionBrowserSourceMaps: true,
    // Ensure a deterministic buildId bound to the commit
    generateBuildId: async () => {
        try {
            const sha = process.env.BUILD_ID || execSync('git rev-parse --short HEAD').toString().trim();
            return sha;
        } catch {
            // Fallback if git is not available in CI (should not happen)
            return `${Date.now()}`;
        }
    },
    webpack: (config) => {
        // Stabilize '@' alias in ESM/CI
        config.resolve = config.resolve || {};
        config.resolve.alias = {
            ...(config.resolve.alias || {}),
            '@': path.resolve(process.cwd()),
        };
        return config;
    },
};

export default nextConfig;
