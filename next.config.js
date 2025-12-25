/** @type {import('next').NextConfig} */
const isProduction = process.env.NODE_ENV === "production"

const nextConfig = {
  basePath: isProduction ? "/holiday-card-2025" : "",
  output: "export",
  images: {
    unoptimized: true,
  },
}

export default nextConfig
