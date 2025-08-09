const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');  // Add this import if missing

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  mode: 'development',
  resolve: {
    fallback: {
      buffer: require.resolve('buffer/'),  // Polyfill Buffer
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Webpack with isomorphic-git',
    }),
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],  // Make Buffer available globally
    }),
  ],
};