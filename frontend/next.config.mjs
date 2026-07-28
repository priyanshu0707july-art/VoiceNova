/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:5000/api/:path*', 
      },
      {
        source: '/socket.io',
        destination: 'http://localhost:5000/socket.io',
      },
      {
        source: '/socket.io/:path*',
        destination: 'http://localhost:5000/socket.io/:path*', 
      }
    ];
  }
};

export default nextConfig;
