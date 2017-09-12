'use strict';

var _ = require('lodash');

exports.buildData = (versions) => {
  const workshopEnvs = [
    'chaucer-prod',
    'colorado-prod',
    'lactinov-prod',
    'lesieur-prod',
    'mixbuffe-prod',
    'ponroy-prod',
    'regilait-prod',
    'stalaven-prod',
    'stjean-prod',
    'bcg-prod',
    'ppaulet-prod'
  ];

  var selectedEnvVersions = _(versions.server)
    .keyBy('name')
    .at(workshopEnvs)
    .value();

  var countByVersion = _(selectedEnvVersions)
    .countBy(envVersion => {
       var workshopVersion = _.find(envVersion.deployments, {'name': 'workshop'}).version.split('.');
       return workshopVersion[0] + '.' + workshopVersion[1];
    })
    .value();
  console.log(countByVersion);

  return {
      datasets: [{
        "label":"Versions",
        "data": _.values(countByVersion),
        "backgroundColor":["rgb(255,179,186)","rgb(255,223,186)","rgb(255,255,186)","rgb(186,255,201)","rgb(186,225,255)"]
      }],

      labels: _.keys(countByVersion)
  };
};

exports.buildOptions = () => {
  return {};
};
