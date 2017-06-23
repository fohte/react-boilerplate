const webpack = require('webpack')
const pathLib = require('path')

const devBuild = process.env.NODE_ENV !== 'production'

const config = {
  name: 'client',
  entry: [
    'es5-shim/es5-shim',
    'es5-shim/es5-sham',
    'babel-polyfill',
    './app/main.js',
  ],
  output: {
    filename: 'client-bundle.js',
    path: pathLib.resolve(__dirname, '../app/assets/webpack'),
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      pathLib.resolve(__dirname, './app'),
      pathLib.resolve(__dirname, './node_modules'),
    ],
    mainFields: ['browser', 'main'],
  },
  plugins: [
    new webpack.EnvironmentPlugin({ NODE_ENV: 'development' }),
    new webpack.NamedModulesPlugin(),
  ],
  module: {
    rules: [
      {
        test: require.resolve('react'),
        use: {
          loader: 'imports-loader',
          options: {
            shim: 'es5-shim/es5-shim',
            sham: 'es5-shim/es5-sham',
          },
        },
      },
      {
        test: /\.jsx?$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
}

module.exports = config

if (devBuild) {
  module.exports.devtool = 'eval-source-map'
} else {
  config.plugins.push(new webpack.optimize.UglifyJsPlugin())
}
