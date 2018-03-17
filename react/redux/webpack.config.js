import path from 'path';
import webpack from 'webpack';


const config = {
  entry: {
    vendors: ['react', 'react-dom', 'redux', 'react-redux', 'lodash'],
    index: path.resolve(__dirname, 'src/client/index.js'),
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
