module.exports = {
  modules: true,
  sourceMap: false,
  map: false,
  plugins: {
    'postcss-import': {},
    'postcss-preset-env': {},
    "autoprefixer": {
      "browsers": [
        ">1%",
        "last 4 versions",
        "Firefox ESR",
        "not ie < 11"
      ],
      "flexbox": "no-2009"
    },
    'cssnano': {
      discardComments: { removeAll: true }
    }
  }
}
