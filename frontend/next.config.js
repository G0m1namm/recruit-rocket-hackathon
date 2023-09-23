/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'http://192.168.1.32:81/:path*'
            }
        ]
    }
}

module.exports = nextConfig
