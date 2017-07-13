var http = require('http');
var fs = require('fs');
var request = require('request');

console.log('Récupération des versions');
var options = {
  url: 'http://uansible.vif.fr/dashboard/versions.json',
  proxy: false
};
request(options, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    var info = JSON.parse(body);
    console.log(info);

    console.log('Construction du graphe');
    var Chart = require('chart.js');
    //var myChart = new Chart(ctx, {...});

    console.log('Lancement du serveur');
    http.createServer(function (req, res) {
      fs.readFile('index.html', 'utf-8', (err, data) => {
        res.writeHead(200, {'Content-Type': 'text/html'});
        var chartData = [];
        for (var i = 0; i < 7; i++)
            chartData.push(Math.random() * 50);

        var result = data.replace('{{chartData}}', JSON.stringify(chartData));
        res.write(result);
        res.end();
      });
    }).listen(8585);
  }
});
