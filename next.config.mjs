/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  async rewrites() {
    return [
      {
        destination: `${process.env.NEXT_PUBLIC_PROD_API_URL}`,
        source: "/api/:path*",
      },
    ];
  },
};

export default nextConfig;
