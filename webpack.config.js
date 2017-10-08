const path = require('path');

module.exports = {
  //entry: './lib/client.js',
  entry: {
  	app: './lib/client.js'
  },
  output: {
    path: path.resolve(__dirname, 'static'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ }
    ]
  }  
};