import criticalCssPlugin from 'preact-cli-plugin-critical-css';
import postCssPlugin from 'preact-cli-postcss';
import asyncPlugin from "preact-cli-plugin-fast-async";

// Read more at https://github.com/developit/preact-cli/wiki/Config-Recipes
export default function(config, env, helpers) {
  criticalCssPlugin(config, env);
  postCssPlugin(config, helpers);
  asyncPlugin(config);

  // Disabling source maps
  const uglify = helpers.getPluginsByName(config, 'UglifyJsPlugin')[0];
  if (uglify) {
    uglify.plugin.options.sourceMap = false;
  }

  const postcssLoader = helpers.getLoadersByName(config, 'postcss-loader');
  postcssLoader.forEach(function(loader ) {
    // console.warn(loader);
    loader.options = {
      sourceMap: false
    };
  });


  const sass = helpers.getLoadersByName(config, 'proxy-loader')[1];
  sass.loader.options.options.sourceMap = false;

  // const pcss = helpers.getLoadersByName(config, 'postcss-loader')[0];
  // // console.warn(pcss.loader.options);
  // pcss.loader.options.sourceMap = true;

  if (env.isProd) {
    config.devtool = false; // disable sourcemaps
  }
};
