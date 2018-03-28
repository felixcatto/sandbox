import path from 'path';
import webpack from 'webpack';


const config = {
  entry: {
    index: path.resolve(__dirname, 'src/index.js'),
  },
  output: {
    filename: '[name].js',
    publicPath: '/js',
  },
  devtool: 'cheap-module-eval-source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['env', { modules: false }],
              'stage-2',
              'react',
            ],
            plugins: [
              ['transform-runtime', {
                polyfill: false,
                regenerator: true,
              }],
            ],
          },
        },
      },
    ],
  },
};

export default config;
