/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  async rewrites() {
    const destinationUrl =
      process.env.NODE_ENV === "production"
        ? process.env.NEXT_PUBLIC_PROD_API_URL
        : process.env.NEXT_PUBLIC_DEV_API_URL;
    return [
      {
        source: "/api/:path*",
        destination: `${destinationUrl}/:path*`,
      },
    ];
  },
};

export default nextConfig;
