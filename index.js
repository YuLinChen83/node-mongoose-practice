
const path = require('path');
const rootPath = path.join(__dirname)

require('@babel/register')({
  root: rootPath, // This tells babel where to look for `babel.config.js` file
  ignore: [/node_modules/],
  only: [rootPath],
})
require('@babel/polyfill')

const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

require('./src/server.js')