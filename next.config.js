/** @type {import('next').NextConfig} */
module.exports = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/login',
        permanent: true,
      },
    ]
  },
  reactStrictMode: true,
  images: {
    domains: [
      'upload.wikimedia.org',
      'wallpaperaccess.com',
      'links.papareact.com',
    ],
  },
}
