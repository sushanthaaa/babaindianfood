import type { NextConfig } from "next";
import path from "node:path";

const LOADER = path.resolve(__dirname, "src/visual-edits/component-tagger-loader.js");

const nextConfig: NextConfig = {
  turbopack: {
    rules: {
      "*.{jsx,tsx}": {
        loaders: [
          {
            loader: LOADER,
            options: {},
          },
        ],
        as: "*.js",
      },
    },
  },
};

export default nextConfig;
