/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone', // <--- Añadimos esto para optimizarlo en Azure
    images: {
        domains: ['lightsoft.blob.core.windows.net', 'storageuss.blob.core.windows.net', 'raw.githubusercontent.com', 'cdn.discordapp.com']
    }
}

module.exports = nextConfig