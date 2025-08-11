/** @type {import('next').NextConfig} */
const nextConfig = {
    // Allows overriding basePath via env at build time (kept empty by default)
    basePath: process.env.NEXT_PUBLIC_BASE_PATH || undefined,
    images: {},
    output: 'export',
    trailingSlash: true,
    reactStrictMode: false,
    devIndicators: false,
};

export default nextConfig;
