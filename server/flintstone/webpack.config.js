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

const config = {
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

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new webpack.optimize.UglifyJsPlugin({
      output: {
        comments: false,
      },
    }),
  );
} else {
  config.devtool = 'cheap-module-eval-source-map';
}

export default config;
