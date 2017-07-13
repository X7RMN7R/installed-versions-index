'use strict';

var request = require('request');

exports.perform = function() {

  return new Promise((resolve, reject) => {
    try {
      console.log(`Récupération des versions`);

      var options = {
        url: 'http://uansible.vif.fr/dashboard/versions.json',
        proxy: false
      };

      request(options, (error, response, body) => {
        if (!error && response.statusCode == 200) {
          var info = JSON.parse(body);

          resolve(info);
        }
      });
    } catch (err) {
      reject(err);
    }
  });

};
