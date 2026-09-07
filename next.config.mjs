/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // The placeholder artwork ships as SVG. next/image's optimizer rejects SVG
    // by default, so allow it (all SVGs here are first-party assets in /public).
    // Raster photos you drop in later are optimized normally either way.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
