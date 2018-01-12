'use strict';

const childProcess = require('child_process');

exports.shellExecSync = function(command, cwd) {
  console.log('Exec: ' + command + (cwd ? ' in ' + cwd : ''));
  childProcess.execSync(command, {cwd: cwd, stdio: [0, 1, 2]});
};

