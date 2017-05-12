const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

const srcPath = path.join(__dirname, 'src/main/js');
const destPath = path.join(__dirname, 'build/js');
const nodeModulesPath = path.join(__dirname, 'node_modules');

const devServerPort = 8080;
const devHotReloadPort = 8101;

module.exports = (debug) => (env) => {
  const extractCss = new ExtractTextPlugin({
    filename: "css.[contenthash].css",
    disable: debug,
  });
  const extractLess = new ExtractTextPlugin({
    filename: "less.[contenthash].css",
    disable: debug,
  });

  // Use babelSettings instead of .babelrc
  const babelSettings = {
    presets: [
      require.resolve('babel-preset-stage-3'),
      [require.resolve('babel-preset-es2015'), { modules: false }],
      require.resolve('babel-preset-react'),
    ],
    plugins: [
      'babel-plugin-transform-class-properties',
      'babel-plugin-syntax-dynamic-import',
      'react-hot-loader/babel',
    ].map(require.resolve),
    cacheDirectory: true,
  };

  let devtool = undefined;
  if (debug) {
    devtool = 'source-map';
  }

  const entry = {
    main: [
      'babel-polyfill',
      'react-hot-loader/patch',
      path.join(srcPath, 'main.js'),
    ],
  };

  const jsLoaders = [
    {
      loader: 'babel-loader',
      query: babelSettings,
    },
  ];

  if (debug) {
    // Enable hotloading in debug mode
    Object.keys(entry).forEach(function hot(entryKey) {
      const entryItem = entry[entryKey];
      entryItem.unshift('webpack/hot/only-dev-server'); // 'only' prevents reload on syntax errors
      entryItem.unshift('webpack-dev-server/client?http://localhost:' + devHotReloadPort);
    });
  }

  const module = {
    rules: [
      {
        test: /\.js?$/,
        exclude: /(node_modules)/,
        use: jsLoaders,
      },
      {
        test: /\.css$/,
        use: extractCss.extract({
          use: [
            { loader: 'css-loader' },
          ],
          fallback: 'style-loader',
        }),
      },
      {
        test: /\.woff(2)?$/,
        use: {
          loader: 'url-loader',
          query: { limit: 10000, mimetype: "application/font-woff" },
        },
      },
      {
        test: /\.(ttf|eot|svg)$/,
        use: 'file-loader',
      },
      {
        test: /\.(png|jpg)$/,
        use: {
          loader: 'url-loader',
          query: {
            limit: 128, // inline base64 URLs for <=128byte images, direct URLs for the rest
          },
        },
      },
    ],
  };

  const plugins = [];

  plugins.push(new webpack.ProvidePlugin({
    Promise: 'imports-loader?this=>global!exports-loader?global.Promise!es6-promise', // Promise Polyfill
    fetch: 'imports-loader?this=>global!exports-loader?global.fetch!whatwg-fetch', // Fetch Polyfill
  }));
  plugins.push(new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: debug ? '"development"' : '"production"',
    },
  }));
  plugins.push(new HtmlWebpackPlugin({
    inject: true,
    template: path.join(srcPath, 'index.html'),
    filename: 'index.html',
  }));
  plugins.push(extractLess);
  plugins.push(extractCss);

  if (debug) {
    plugins.push(new webpack.HotModuleReplacementPlugin());
    plugins.push(new webpack.NamedModulesPlugin());
  }

  return {
    target: 'web',
    cache: true,
    entry: entry,
    resolve: {
      extensions: ['.js'],
      modules: [srcPath, nodeModulesPath, 'src/main/js'],
    },
    resolveLoader: {
      modules: [nodeModulesPath],
    },
    output: {
      path: destPath,
      publicPath: '',
      filename: debug ? '[name].js' : '[name].[chunkhash].js',
      chunkFilename: debug ? '[name].js' : '[name].[chunkhash].js',
    },
    module: module,
    plugins: plugins,
    devtool: devtool,
    devServer: {
      devHotReloadPort: devHotReloadPort,
      devServerPort: devServerPort,
    },
  };
};
