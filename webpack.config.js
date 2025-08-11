import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const __dirname = path.resolve();

export default {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.[contenthash].js',
    clean: true,
  },
  devServer: {
    static: './dist',
    port: 8080,
    open: false,
  },
  module: {
    rules: [
      { test: /\.s?css$/i, use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'] },
      { test: /\.(png|jpe?g|gif|svg|ico)$/i, type: 'asset/resource' }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './_index.html', filename: 'index.html' }),
    new MiniCssExtractPlugin({ filename: 'styles.[contenthash].css' }),
  ],
};
