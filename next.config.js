/** @type {import('next').NextConfig} */
const isProduction = process.env.NODE_ENV === "production"

const nextConfig = {
  basePath: isProduction ? "/holiday-card-2025" : "",
  output: "export",
  env: {
    NEXT_PUBLIC_BASE_PATH: isProduction ? "/holiday-card-2025" : "",
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
