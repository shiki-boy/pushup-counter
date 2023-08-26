/** @type {import('next').NextConfig} */
const nextConfig = { reactStrictMode: true }
const withPWA = require( 'next-pwa' )

module.exports = withPWA( {
  pwa: {
    dest: 'public',
    disable: 'development' === process.env.NODE_ENV,
    register: true,
    skipWaiting: true,
  },
} )
module.exports = nextConfig
