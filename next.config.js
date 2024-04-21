/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['lightsoft.blob.core.windows.net']
    },
    env: {
        API_URL: process.env.API_URL,
    },
}

module.exports = nextConfig
