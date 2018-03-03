import path from 'path';
import webpack from 'webpack';
import { capitalize } from 'lodash';
import clientPages from './src/lib/clientPages';


const entries = Object.values(clientPages)
  .reduce((acc, componentName) => ({
    ...acc,
    [componentName]: path
      .resolve(__dirname, `src/client/pages/${capitalize(componentName)}.js`),
  }), {});

export default {
  entry: {
    vendors: ['react', 'react-dom', 'lodash'],
    ...entries,
  },
  output: {
    filename: '[name].js',
    publicPath: '/js',
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
              ['env', { modules: false }],
              'stage-2',
              'react',
            ],
          },
        },
      },
    ],
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendors',
      minChunks: Infinity,
    }),
  ],
};
