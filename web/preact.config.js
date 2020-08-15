const tailwindcss = require("tailwindcss");
const purgecss = require("@fullhuman/postcss-purgecss");

module.exports = (config, env, helpers) => {
  purgecss({
    content: ["./src/**/*.js"],
    defaultExtractor: (content) => content.match(params.regex) || [],
  });

  const postCssLoaders = helpers.getLoadersByName(config, "postcss-loader");
  postCssLoaders.forEach(({ loader }) => {
    const { plugins } = loader.options;
    plugins.unshift(tailwindcss("./tailwind.config.js"));
  });
};
