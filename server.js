var path = require('path');
var express = require('express');
var webpack = require('webpack');
var config = require('./webpack/webpack.config.development');

var app = express();
var compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  publicPath: config.output.publicPath,
  stats: {colors: true}
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'app', 'index-dev.html'));
});

app.listen(3000, 'localhost', function(err) {
  if (err) return console.log(err);

  console.log('3000 포트 실행됨.');
});
