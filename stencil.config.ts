import { Config } from '@stencil/core';
import { postcss } from "@stencil/postcss";
import autoprefixer from "autoprefixer";

const purgecss = require("@fullhuman/postcss-purgecss")({
  content: ["./src/**/*.tsx", "./src/index.html"],
  defaultExtractor: (content) => content.match(/[A-Za-z0-9-_:/]+/g) || [],
});

export const config: Config = {
  namespace: 'table',
  taskQueue: 'async',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader'
    },
    {
      type: 'docs-readme'
    },
    {
      type: 'www',
      serviceWorker: null // disable service workers
    }
  ],
  plugins: [
    postcss({
      plugins: [
        require("tailwindcss"),
        require("postcss-nested"),
        autoprefixer(),
        ...(process.env.NODE_ENV === "production"
          ? [purgecss, require("cssnano")]
          : []),
      ],
    })
  ],
};
