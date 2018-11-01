const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');


const common = {
  entry: {
    index: path.resolve(__dirname, 'src/client/index.js'),
  },
  output: {
    filename: 'js/[name].js',
    path: path.resolve(__dirname, 'dist/public'),
    publicPath: '/',
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
              '@babel/plugin-syntax-dynamic-import',
              '@babel/plugin-proposal-class-properties',
            ],
          },
        },
      },
      {
        test: /local\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { modules: 1 } },
          'sass-loader',
        ],
      },
      {
        test: /(?<!local)\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'font/[name].[ext]',
          },
        },
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: 'src/public/img/*',
        to: 'img/',
        flatten: true
      },
    ]),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
    }),
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          name: 'vendors',
          chunks: 'initial',
          test: /node_modules/,
        },
      }
    },
  },
  stats: {
    warnings: false,
    children: false,
    modules: false,
  },
};


if (process.env.NODE_ENV === 'production') {
  module.exports = merge(common, {
    mode: 'production',
  });
} else {
  module.exports = merge(common, {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    plugins: [new webpack.HotModuleReplacementPlugin()],
  });
}
