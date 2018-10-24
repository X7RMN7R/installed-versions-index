'use strict';

var requirefrom = require('requirefrom'),
  request = require('request'),
  scripts = requirefrom('./src'),
  utils = scripts('utils.js'),
  fs= require('fs'),
  _ = require('lodash');

exports.perform = function() {

  return new Promise((resolve, reject) => {
    try {
      console.log(`Récupération des versions`);
      var versions = [
        {'name' : 'alsacel', 'server' : 'alsacel-prod'},
        {'name' : 'bcg', 'server' : 'bcg-prod'},
        {'name' : 'cemoi', 'server' : 'cemoi-prod'},
        {'name' : 'chaucer', 'server' : 'chaucer-prod'},
        {'name' : 'colorado', 'server' : 'colorado-prod'},
        {'name' : 'eastbalt', 'server' : 'eastbalt-prod'},
        {'name' : 'lactinov', 'server' : 'lactinov-prod'},
        {'name' : 'lesieur', 'server' : 'lesieur-gds-prod'},
        {'name' : 'meralli', 'server' : 'meralli-prod'},
	      {'name' : 'miecalin', 'server' : 'miecalin-prod.cheops'},
        {'name' : 'mixbuffe', 'server' : 'mixbuffe-prod'},
        {'name' : 'ponroy', 'server' : 'ponroy-prod'},
        {'name' : 'ppaulet', 'server' : 'ppaulet-prod'},
        {'name' : 'regilait', 'server' : 'regilait-prod'},
	      {'name' : 'soufflet', 'server' : 'soufflet-prod'},
        {'name' : 'stalaven', 'server' : 'stalaven-prod'},
        {'name' : 'stjean', 'server' : 'stjean-prod'},
	      {'name' : 'sva34p', 'server' : 'sva34p-tai-prod'}
      ];

      if (!fs.existsSync('.tmp/inventory')) {
        utils.shellExecSync(`git clone https://GenericVIFUser:jlcbdg12@bitbucket.org/vifweb/vifwebinstaller-inventory.git .tmp/inventory`);
      } else {
        utils.shellExecSync(`git fetch`, `.tmp/inventory`);
        utils.shellExecSync(`git rebase`, `.tmp/inventory`);
      }

      _(versions).forEach(version => {
        var inventory = fs.readFileSync(`.tmp/inventory/clients/` + version.name + `/` + version.server, 'utf-8');

        const workshopRegex = new RegExp('.*.*.*workshop_version_to_deploy=(\\S*).*', 'g');
        const workshopVersion = workshopRegex.exec(inventory)[1];

        version.workshopVersion = workshopVersion;
        version.num = workshopVersion.substr(0, workshopVersion.lastIndexOf("."));
      });

      console.log(versions);

      resolve(versions);

    } catch (err) {
      reject(err);
    }

  });

};
