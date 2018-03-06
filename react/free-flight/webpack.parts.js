const ExtractTextPlugin = require('extract-text-webpack-plugin');


exports.devServer = ({ host, port } = {}) => ({
  devServer: {
    historyApiFallback: true,
    stats: 'errors-only',
    host, // Defaults to `localhost`
    port, // Defaults to 8080
    overlay: {
      errors: true,
      warnings: true,
    },
  },
});


exports.loadCSS = ({ include, exclude } = {}) => ({
  module: {
    rules: [
      {
        test: /\.css$/,
        include,
        exclude,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.scss$/,
        include,
        exclude,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
});


exports.extractCSS = ({ use }) => {
  const plugin = new ExtractTextPlugin({
    filename: '[name].css',
  });
  return {
    module: {
      rules: [
        {
          test: /\.css$/,
          use: plugin.extract({
            use: ['css-loader', use],
            fallback: 'style-loader',
          }),
        },
        {
          test: /\.scss$/,
          use: plugin.extract({
            use: ['css-loader', use, 'sass-loader'],
            fallback: 'style-loader',
          }),
        },
      ],
    },
    plugins: [ plugin ],
  };
};


exports.autoprefix = () => ({
  loader: 'postcss-loader',
  options: {
    plugins: () => ([
      require('autoprefixer')(),
    ]),
  },
});


exports.loadImages = ({ include, exclude, options } = {}) => ({
  module: {
    rules: [
      {
        test: /\.(png|jpg|svg)$/,
        include,
        exclude,
        use: {
          loader: 'url-loader',
          options,
        },
      },
    ],
  },
});


exports.loadSVG = ({ options }) => ({
  module: {
    rules: [
      {
        test: /\.svg$/,
        // use: 'svg-inline-loader',
        use: {
          loader: 'file-loader',
          options,
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
        test: /\.js$/,
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
