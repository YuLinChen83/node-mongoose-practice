const path = require('path');
const serverConfig = {
  entry: "./src/server.js",
  target: 'node',
  devtool: "cheap-module-source-map",
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'lib.node.js',
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