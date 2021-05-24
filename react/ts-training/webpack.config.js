const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const babelConfig = require('./babelconfig.js');

const common = {
  entry: {
    index: path.resolve(__dirname, 'client/index.tsx'),
  },
  output: {
    filename: 'js/[name].js',
    path: path.resolve(__dirname, 'dist/public'),
  },
  resolve: { extensions: ['.tsx', '.ts', '.js'] },
  module: {
    rules: [
      {
        test: /(\.js$|\.ts$|\.tsx)/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: babelConfig.client,
        },
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-modules-typescript-loader' },
          {
            loader: 'css-loader',
            options: {
              url: false,
              modules: {
                auto: true,
                localIdentName: '[local]--[hash:base64:5]',
              },
            },
          },
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [new MiniCssExtractPlugin({ filename: 'css/[name].css' })],
  stats: { warnings: false, children: false, modules: false },
};

if (process.env.ANALYZE) {
  const plugins = [new BundleAnalyzerPlugin({ openAnalyzer: false })].concat(common.plugins);
  module.exports = {
    ...common,
    mode: 'production',
    plugins,
  };
} else if (process.env.NODE_ENV === 'production') {
  module.exports = {
    ...common,
    mode: 'production',
  };
} else {
  const entry = {
    index: ['blunt-livereload/dist/client', common.entry.index],
  };

  module.exports = {
    ...common,
    mode: 'development',
    devtool: 'eval-cheap-module-source-map',
    entry,
  };
}
