'use strict';

var http = require('http');
var fs = require('fs');
var request = require('request');
var getData = require('./src/get-data');
var buildChart = require('./src/build-chart');

getData.perform().then((versions) => {
  var chartData = buildChart.buildData(versions);
  var chartOptions = buildChart.buildOptions();

  console.log('Server started');
  http.createServer((req, res) => {
    fs.readFile('index.html', 'utf-8', (err, data) => {
      res.writeHead(200, {'Content-Type': 'text/html'});
      var result = data.replace('{{data}}', JSON.stringify(chartData));
      result = result.replace('{{options}}', JSON.stringify(chartOptions));
      res.write(result);
      res.end();
    });
  }).listen(8585);

});
