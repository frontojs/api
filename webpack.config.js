const path = require('path');

const config = { 
  entry: './src/index.js',
  output: {
    filename: './lib/index.js',
    libraryTarget: 'umd',
    library: 'fronto-api'
  },
  module: { 
    rules: [{
      test: /\.(js|jsx)$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          babelrc: false,
          presets: [
            ["es2015", { "modules": false }], 'es2017', 'stage-0'
          ]
        },
      },
    }]
  }
};

module.exports = config;