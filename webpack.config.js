const path = require('path');

module.exports = {
  entry: './src/maze.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './')
  }
};
