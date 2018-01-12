'use strict';

var _ = require('lodash');

exports.buildData = (versions) => {
  var countByVersion = _(versions).countBy(
    version => {
      return version.num;
    }).value();
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
