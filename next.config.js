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
    MYSQL_HOST: "localhost",
    MYSQL_USER: "root",
    MYSQL_PASSWORD: "Canerkrc40.",
    MYSQL_DBNAME: "sulamasistemi",
  },
};
module.exports = nextConfig;
