import path from 'path';
import webpack from 'webpack';

let config = {
  entry: './main.js',
  output: {
    filename: './bundle.js',
    path: path.resolve(__dirname, '../site'),
  },
  context: path.resolve(__dirname, '../site'),
}

function scripts() {
  return new Promise(resolve => webpack(config, (err, stats) => {
    if (err) console.log('Webpack', err);
    console.log(stats.toString());
    resolve();
  }));
}

module.exports = { config, scripts };
