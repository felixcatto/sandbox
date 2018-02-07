export default {
  entry: ['./src/js/bundle.js'],
  output: {
    filename: 'bundle.js',
    publicPath: '/js',
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
              ["env", { modules: false }],
              "stage-2",
              "react"
            ],
          },
        },
      },
    ],
  },
};
