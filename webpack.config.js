const path = require('path');

module.exports = {
  //entry: './lib/client.js',
  entry: {
  	app: ['babel-polyfill','./lib/client.js']
  },
  output: {
    path: path.resolve(__dirname, 'static'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ },
      {
        test: /\.css$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" }
        ]
      }      /*
      {
         test: /\.css$/,
         loader: 'style-loader!css-loader'
      }*/     
    ]
  }  
};