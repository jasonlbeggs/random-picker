const tailwindcss = require("tailwindcss");
const autoprefixer = require("autoprefixer");
const purgecss = require("@fullhuman/postcss-purgecss");

module.exports = {
  plugins: [
    tailwindcss("./tailwind.js"),
    autoprefixer({}),
    purgecss({
      content: ["./src/**/*.vue"],
      extractors: [
        {
          extractor: class TailwindExtractor {
            static extract(content) {
              return content.match(/[A-z0-9-:/]+/g) || [];
            }
          },
          extensions: ["vue"]
        }
      ]
    })
  ]
};
