module.exports = {
  presets: [
    ["@babel/env", {
      targets: {
        node: true,
      },
    }],
  ],
  plugins: [
    ["@babel/plugin-proposal-pipeline-operator", { proposal: "minimal" }]
  ],
};
