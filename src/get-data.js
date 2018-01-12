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
        {'name' : 'bcg'},
        {'name' : 'cemoi'},
        {'name' : 'chaucer'},
        {'name' : 'colorado'},
        {'name' : 'lactinov'},
        {'name' : 'lesieur'},
        {'name' : 'miti'},
        {'name' : 'mixbuffe'},
        {'name' : 'ponroy'},
        {'name' : 'ppaulet'},
        {'name' : 'regilait'},
        {'name' : 'stalaven'},
        {'name' : 'stjean'}
      ];

      if (!fs.existsSync('.tmp/inventory')) {
        utils.shellExecSync(`git clone https://GenericVIFUser:jlcbdg12@bitbucket.org/vifweb/vifwebinstaller-inventory.git .tmp/inventory`);
      } else {
        utils.shellExecSync(`git fetch`, `.tmp/inventory`);
        utils.shellExecSync(`git rebase`, `.tmp/inventory`);
      }

      _(versions).forEach(version => {
        var inventory = fs.readFileSync(`.tmp/inventory/clients/` + version.name + `/` + version.name + `-prod`, 'utf-8');
        
        const workshopRegex = new RegExp('.*.*.*workshop_version_to_deploy=(\\S*).*', 'g');
        const workshopVersion = workshopRegex.exec(inventory)[1];
        
        version.num = workshopVersion.substr(0, workshopVersion.lastIndexOf("."));
      });
      
      console.log(versions);

      resolve(versions);

    } catch (err) {
      reject(err);
    }

  });

};
