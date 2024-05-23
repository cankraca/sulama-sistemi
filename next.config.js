/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",
      },
    ],
  },
  env: {
    JWT_SECRET:
      "9b8f16a27d4a6d96c74df0a2451c09e3c1b5f5a3a8c65fd82d6d5e91f34c6f72",
    MYSQL_HOST: "localhost",
    MYSQL_USER: "root",
    MYSQL_PASSWORD: "Canerkrc40.",
    MYSQL_DBNAME: "sulamasistemi",
  },
};
module.exports = nextConfig;
