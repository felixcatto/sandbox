const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


const isDevMode = process.env.NODE_ENV !== 'production';
const mode = isDevMode ? 'development': 'production';
const devtool = isDevMode ? 'cheap-module-eval-source-map': '';
const plugins = isDevMode ? [new webpack.HotModuleReplacementPlugin()] : [];

module.exports = {
  mode,
  devtool,
  entry: {
    index: path.resolve(__dirname, 'src/client/index.js'),
  },
  output: {
    filename: 'js/index.js',
    path: path.resolve(__dirname, 'dist/public'),
    publicPath: '/public/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', {
                modules: false,
                targets: {
                  browsers: [
                    'last 2 Chrome versions',
                    'last 2 Edge versions',
                    'last 2 Firefox versions',
                    'last 2 Safari versions',
                  ],
                },
              }],
              '@babel/preset-react',
            ],
            plugins: [
              '@babel/plugin-proposal-class-properties',
            ],
          },
        },
      },
    ],
  },
  plugins,
};
