const path = require('path');
const lsr = require('lsr');
const webpack = require('webpack');
const dotenv = require('dotenv');

dotenv.load();

function buildEntry() {
  var entry = {};
  var files = lsr.sync(path.join(__dirname, './src/client/pages'));

  for (var i = 0; i < files.length; i++) {
    if (path.extname(files[i].path) == '.js') {
      entry[files[i].path.substring(2).replace('.js', '')] = path.join(__dirname, './src/client/pages/', files[i].path);
    }
  }
  return entry;
}

function buildExternals() {
  return {
    jquery: 'jQuery'
  }
}

function buildLoaders() {
  return [
    {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    },
    {
      test: /\.(css|scss)/,
      loader: 'style-loader!css-loader!postcss-loader!sass-loader',
    }
  ];
}

function buildOutput() {
  return {
    path: path.resolve('./src/public/assets'),
    publicPath: '/assets/',
    filename: '[name].bundle.js',
    chunkFilename: '[id].chunk.js',
    library: 'config',
    libraryTarget: 'var'
  };
}

function buildDevServer() {
  return {
    publicPath: '/assets/',
    compress: true,
    port: 9000,
    proxy: {
      '*': 'http://localhost:9009'
    }
  }
}

var config = {
    AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
    AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
    AUTH0_CALLBACK_URL: process.env.AUTH0_CALLBACK_URL,
    AUTH0_CONNECTION: process.env.AUTH0_CONNECTION,
    SCOPE: process.env.SCOPE
};

module.exports = {
  entry: buildEntry(),
  output: buildOutput(),
  externals: buildExternals(),
  module: {
    loaders: buildLoaders()
  },
  devtool: 'source-map',
  devServer: buildDevServer(),
  plugins: [
    new webpack.DefinePlugin({
      __AUTH0_DOMAIN__: JSON.stringify(config.AUTH0_DOMAIN),
      __AUTH0_CLIENT_ID__: JSON.stringify(config.AUTH0_CLIENT_ID),
      __AUTH0_CALLBACK_URL__: JSON.stringify(config.AUTH0_CALLBACK_URL),
      __AUTH0_CONNECTION__: JSON.stringify(config.AUTH0_CONNECTION),
      __SCOPE__: JSON.stringify(config.SCOPE),
    })
  ]
}
