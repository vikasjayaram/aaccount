const path = require('path');
const lsr = require('lsr');

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
    chunkFilename: '[id].chunk.js'
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

module.exports = {
  entry: buildEntry(),
  output: buildOutput(),
  externals: buildExternals(),
  module: {
    loaders: buildLoaders()
  },
  devtool: 'source-map',
  devServer: buildDevServer()
}
