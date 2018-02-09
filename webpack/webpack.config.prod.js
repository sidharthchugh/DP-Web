var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var InlineEnviromentVariablesPlugin = require('inline-environment-variables-webpack-plugin');
var webpack = require('webpack');
var AssetsPlugin = require('assets-webpack-plugin');
var RollbarSourceMapPlugin = require('rollbar-sourcemap-webpack-plugin')

var assetsPath = path.join(__dirname, '..', 'public', 'assets');
var publicPath = process.env.CDN_PATH||'/assets/';

var commonLoaders = [
  {
    /*
     * TC39 categorises proposals for babel in 4 stages
     * Read more http://babeljs.io/docs/usage/experimental/
     */
    test: /\.js$|\.jsx$/,
    loader: 'babel-loader',
    include: path.join(__dirname, '..', 'src'),
    exclude: path.join(__dirname, '..', 'node_modules'),
    // Reason why we put this here instead of babelrc
    // https://github.com/gaearon/react-transform-hmr/issues/5#issuecomment-142313637
    query: {
      presets: ['es2015', 'react', 'stage-0'],
      plugins: [
        'transform-decorators-legacy',
        'transform-react-remove-prop-types',
        'transform-react-constant-elements',
        'transform-react-inline-elements',
        'add-react-displayname',
        'transform-object-assign',
        'transform-object-rest-spread'
      ]
    }
  },
  { test: /\.json$/, loader: 'json-loader' },
  { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    loader: 'url-loader?limit=10000&minetype=application/font-woff&name=./[hash].[ext]'
  },
  { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    loader: 'file-loader',
    query: {
        name: '[hash].[ext]'
    }
  },
  {
    test: /\.(png|jpg|jpeg|gif)$/,
    loader: 'url',
    query: {
        name: '[hash].[ext]',
        limit: 10000,
    }
  },
  { test: /\.s?css$/,
    loader: ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap&-minimize!postcss-loader!sass-loader')
  },
];

var postCSSConfig = function () {
  return [
    require('postcss-import')(),
    require('postcss-cssnext')({
      browsers: ['> 1%', 'last 2 versions']
    }),
    require('postcss-reporter')({ clearMessages: true })
  ];
};
module.exports = [
  {
    // The configuration for the client
    name: 'browser',
    /* The entry point of the bundle
     * Entry points for multi page app could be more complex
     * A good example of entry points would be:
     * entry: {
     *   pageA: "./pageA",
     *   pageB: "./pageB",
     *   pageC: "./pageC",
     *   adminPageA: "./adminPageA",
     *   adminPageB: "./adminPageB",
     *   adminPageC: "./adminPageC"
     * }
     *
     * We can then proceed to optimize what are the common chunks
     * plugins: [
     *  new CommonsChunkPlugin("admin-commons.js", ["adminPageA", "adminPageB"]),
     *  new CommonsChunkPlugin("common.js", ["pageA", "pageB", "admin-commons.js"], 2),
     *  new CommonsChunkPlugin("c-commons.js", ["pageC", "adminPageC"]);
     * ]
     */
     // SourceMap without column-mapping
    devtool: 'cheap-module-source-map',
    context: path.join(__dirname, '..', 'src'),
    entry: {
      app: './client'
    },
    output: {
      path: assetsPath,
      filename: '[name].[chunkhash].js',
      chunkFilename: '[name].[id].[chunkhash].js',
      publicPath: publicPath
    },
    module: {
      loaders: commonLoaders
    },
    resolve: {
      root: [path.join(__dirname, '..', 'src')],
      extensions: ['', '.js', '.jsx', '.css']
    },
    plugins: [
        // Assign the module and chunk ids by occurrence count
        // Consistent ordering of modules required if using any hashing ([hash] or [chunkhash])
        // https://webpack.github.io/docs/list-of-plugins.html#occurrenceorderplugin
        new webpack.optimize.OccurrenceOrderPlugin(true),
        // Search for equal or similar files and deduplicate them in the output
        // https://webpack.github.io/docs/list-of-plugins.html#dedupeplugin
        new webpack.optimize.DedupePlugin(),
        // extract inline css from modules into separate files
        new ExtractTextPlugin('styles/[name].[chunkhash].css', { allChunks: true }),
        new webpack.optimize.UglifyJsPlugin({
          sourcemap: false,
          compress: {
            warnings: false
          }
        }),
        // A plugin for a more aggressive chunk merging strategy
        // https://webpack.github.io/docs/list-of-plugins.html#aggressivemergingplugin
        new webpack.optimize.AggressiveMergingPlugin(),
        new webpack.DefinePlugin({
          __DEVCLIENT__: false,
          __DEVSERVER__: false
        }),
        new InlineEnviromentVariablesPlugin({ NODE_ENV: 'production' }),
        // Emit a file with assets paths
        // https://github.com/sporto/assets-webpack-plugin#options
        new AssetsPlugin({
          filename: 'prod-assets.json'
        }),
        new RollbarSourceMapPlugin({
          accessToken: '2163e5cbf0b541198b5a19190bd593bb',
          version: 'git sha',
          publicPath: publicPath
     })
    ],
    postcss: postCSSConfig,
    sassLoader: {
      include: path.join(__dirname, '..', 'node_modules', 'sass-loader')
    }
  }, {
    // The configuration for the server-side rendering
    name: 'server-side rendering',
    context: path.join(__dirname, '..', 'src'),
    entry: {
      server: './server'
    },
    target: 'node',
    output: {
      // The output directory as absolute path
      path: assetsPath,
      // The filename of the entry chunk as relative path inside the output.path directory
      filename: 'server.js',
      // The output path from the view of the Javascript
      publicPath: publicPath,
      libraryTarget: 'commonjs2'
    },

    module: {
      loaders: commonLoaders
    },
    resolve: {
      root: [path.join(__dirname, '..', 'src')],
      extensions: ['', '.js', '.jsx', '.css']
    },
    plugins: [
        new webpack.DefinePlugin({
          __DEVCLIENT__: false,
          __DEVSERVER__: false
        }),
        new ExtractTextPlugin('styles/[name].[chunkhash].css', { allChunks: true }),
        new webpack.IgnorePlugin(/vertx/),
        new InlineEnviromentVariablesPlugin({ NODE_ENV: 'production' }),
        new RollbarSourceMapPlugin({
          accessToken: '2163e5cbf0b541198b5a19190bd593bb',
          version: 'git sha',
          publicPath: publicPath
     })
    ],
    postcss: postCSSConfig,
    sassLoader: {
      include: path.join(__dirname, '..', 'node_modules', 'sass-loader')
    }
  }
];
