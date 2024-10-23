/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  async rewrites() {
    return [
      {
        destination: `${process.env.NEXT_PUBLIC_DEV_API_URL}`,
        source: "/:path*",
      },
    ];
  },
};

export default nextConfig;
