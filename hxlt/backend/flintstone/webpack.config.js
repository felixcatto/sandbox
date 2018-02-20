import path from 'path';
import webpack from 'webpack';
export default {
  entry: {
    vendors: ['react', 'react-dom'],
    home: path.resolve(__dirname, 'src/client/pages/Home.jsx'),
  },
  output: {
    filename: '[name].js',
    // path: path.resolve(__dirname, 'app/public/js'),
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
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
