import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "bs-uploads.toptal.io",
				port: "",
				pathname: "/**",
			},
		],
	},
};

export default nextConfig;
