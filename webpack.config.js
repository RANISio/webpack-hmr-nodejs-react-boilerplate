const path = require('path')
const webpack = require('webpack')
const StartServerPlugin = require('start-server-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const outDir = process.env.NODE_ENV==='production' ? path.resolve(__dirname, 'dist') : path.resolve(__dirname, 'build')

const serverConfig = {
  target: 'async-node',
  devtool: 'inline-source-map',
  entry: {
    server: [
      'webpack/hot/poll?1000',
      './server.js'
    ] 
  },
  output: {
    path: outDir,
    filename: '[name].js',
    devtoolModuleFilenameTemplate: '[absolute-resource-path]',
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
      { 
        test: /\.js$/, 
        exclude: /node_modules/,
        use: 'babel-loader'
      }
    ]
  },
  node: {
    __filename: true,
    __dirname: true,
  },
  plugins: [
    new StartServerPlugin(),
    new CleanWebpackPlugin([outDir]),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
}

const clientConfig = {
  target: 'web', // <=== can be omitted as default is 'web'
  devtool: 'inline-source-map',
  entry: {
    app: [
      // 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
      './src/client/index.js'
    ]
  },
  output: {
    path: outDir + '/public',
    filename: '[name].js',
    publicPath: '/'
  },
  module: {
    rules: [
      { 
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },{
        test: /\.html$/,
        use:  'html-loader'
      },
      {
        test: /\.css$/,
        use: ['style-loader','css-loader']
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: 'file-loader'
      }
    ]
  },
  plugins: [
    // new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({title: 'Webpack NodeJs Express React Boilerplate with Server and Client HMR'})
  ]
};

module.exports = [ serverConfig ];