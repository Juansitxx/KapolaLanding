import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Solo afecta `next dev`: permite probar la landing desde celulares de la red local
  allowedDevOrigins: ["192.168.40.12", "192.168.*.*"],
};

export default nextConfig;
