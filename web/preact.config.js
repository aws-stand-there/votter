const tailwindcss = require("tailwindcss");

module.exports = (config, env, helpers) => {
  const postCssLoaders = helpers.getLoadersByName(config, "postcss-loader");
  postCssLoaders.forEach(({ loader }) => {
    const { plugins } = loader.options;
    plugins.unshift(tailwindcss("./tailwind.config.js"));
  });
};
