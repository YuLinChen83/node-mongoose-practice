const path = require('path');
const serverConfig = {
  entry: "./index.js",
  target: 'node',
  devtool: "cheap-module-source-map",
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    libraryTarget: "commonjs2"
  },
  module: {
    rules: [
      {
        test: /js$/,
        exclude: /(node_modules)/,
        loader: "babel-loader",
      }
    ]
  }
};

module.exports = serverConfig;