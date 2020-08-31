const CracoAntDesignPlugin = require("craco-antd");

module.exports = {
  plugins: [
    {
      plugin: CracoAntDesignPlugin,
      options: {
        customizeTheme: {
          "@primary-color": "#75568C",
          "@link-color": "#75568C",
        },
      },
    },
  ],
};
