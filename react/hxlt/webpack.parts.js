const ExtractTextPlugin = require('extract-text-webpack-plugin');


exports.devServer = () => ({
  devServer: {
    historyApiFallback: true,
    stats: 'errors-only',
    port: 4000,
    overlay: {
      errors: true,
      warnings: true,
    },
  },
});


exports.loadCSS = () => ({
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
});


exports.extractCSS = () => {
  const plugin = new ExtractTextPlugin({
    filename: '[name].css',
  });
  return {
    module: {
      rules: [
        {
          test: /\.css$/,
          use: plugin.extract({
            use: ['css-loader', 'postcss-loader'],
            fallback: 'style-loader',
          }),
        },
        {
          test: /\.scss$/,
          use: plugin.extract({
            use: ['css-loader', 'postcss-loader', 'sass-loader'],
            fallback: 'style-loader',
          }),
        },
      ],
    },
    plugins: [ plugin ],
  };
};


exports.loadImages = () => ({
  module: {
    rules: [
      {
        test: /\.(png|jpg|svg)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]',
          },
        },
      },
    ],
  },
});


exports.loadFonts = () => ({
  module: {
    rules: [
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
});


exports.loadJS = ({ include }) => ({
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include,
        loader: 'babel-loader',
      },
    ],
  },
});


exports.loadHTML = () => ({
  module: {
    rules: [
      {
        test: /\.html$/,
        use: 'html-loader',
      },
    ],
  },
});
