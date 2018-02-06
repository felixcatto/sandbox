export default {
  output: {
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
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
