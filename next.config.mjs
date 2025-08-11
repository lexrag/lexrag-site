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
};

export default nextConfig;
