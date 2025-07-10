/** @type {import('next').NextConfig} */
const nextConfig = {
    // For local development, basePath is '/'
    // This file will be overwritten during deployment with the appropriate basePath
    images: {},
    output: 'standalone',
    reactStrictMode: false,
    devIndicators: false
};

export default nextConfig;
