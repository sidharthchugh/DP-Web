const path = require('path');
const webpack = require('webpack');

const assetsPath = path.join(__dirname, '..', 'public', 'assets');
const hotMiddlewareScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true';
const AssetsPlugin = require('assets-webpack-plugin');
const styleLintPlugin = require('stylelint-webpack-plugin');

const commonLoaders = [
  {
    /*
     * TC39 categorises proposals for babel in 4 stages
     * Read more http://babeljs.io/docs/usage/experimental/
     */
    test: /\.js$|\.jsx$/,
    loader: 'babel-loader',
    // Reason why we put this here instead of babelrc
    // https://github.com/gaearon/react-transform-hmr/issues/5#issuecomment-142313637
    query: {
      "compact":false,
      presets: ['react-hmre', 'es2015', 'react', 'stage-0'],
      plugins: ['transform-decorators-legacy', 'add-react-displayname','transform-object-rest-spread', 'transform-object-assign', 'transform-runtime']
    },
    include: path.join(__dirname, '..', 'src'),
    exclude: path.join(__dirname, '..', 'node_modules')
  },
  {
    test: /\.(png|jpg|jpeg|gif)$/,
    loader: 'url',
    query: {
        name: '[hash].[ext]',
        limit: 10000,
    }
  },
  { test: /\.html$/, loader: 'html-loader' }
];

const postCSSConfig = function () {
  return [
    require('postcss-import')({
      path: path.join(__dirname, '..', 'src', 'styles'),
      addDependencyTo: webpack // for hot-reloading
    }),
    require('postcss-cssnext')({
      browsers: ['> 1%', 'last 2 versions']
    }),
    require('postcss-reporter')({ clearMessages: true })
  ];
};

module.exports = {
    // eval - Each module is executed with eval and //@ sourceURL.
    // The configuration for the client
    devtool: 'eval',
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
    context: path.join(__dirname, '..', 'src'),
    // Multiple entry with hot loader
    // https://github.com/glenjamin/webpack-hot-middleware/blob/master/example/webpack.config.multientry.js
    entry: {
      app: ['./client', hotMiddlewareScript]
    },
    output: {
      // The output directory as absolute path
      path: assetsPath,
      // The filename of the entry chunk as relative path inside the output.path directory
      filename: '[name].js',
      // The output path from the view of the Javascript
      publicPath: '/assets/'
    },
    module: {
      loaders: commonLoaders.concat([
        { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: 'url-loader?limit=10000&minetype=application/font-woff'
        },
        { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: 'file-loader'
        },
        { test: /\.s?css$/,
          loader: 'style!css!postcss-loader!sass'
        }
      ])
    },
    resolve: {
      root: [path.join(__dirname, '..', 'src')],
      extensions: ['', '.js', '.jsx', '.css'],
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
          __DEVCLIENT__: true,
          __DEVSERVER__: false
        }),
        new AssetsPlugin({
          filename: 'dev-assets.json'
        })
    ],
    postcss: postCSSConfig,
    sassLoader: {
      include: path.join(__dirname, '..', 'node_modules', 'sass-loader')
    }
};
