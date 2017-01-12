// flightplan.js
var plan = require('flightplan');

console.log(process.env.SSH_AUTH_SOCK);


plan.target('local', [
  {
    host: '10.1.160.17',
    username: 'deploy',
    privateKey: '/Users/jyoung/.ssh/id_rsa',
    agent: process.env.SSH_AUTH_SOCK
  }

]);

var tmpDir = 'appstract-client' + new Date().getTime();

// run commands on localhost
plan.local(function(local) {
  // local.log('Run build');
  // local.exec('gulp build');
  //
  // local.log('Copy files to remote hosts');
  var filesToCopy = local.exec('git ls-files', {silent: true});
  // rsync files to all the target's remote hosts
  local.transfer(filesToCopy, '/tmp/' + tmpDir);
});

// run commands on the target's remote hosts
plan.remote(function(remote) {
  remote.log('Move folder to web root');
  remote.sudo('cp -R /tmp/' + tmpDir + ' ~/public/', {user:'deploy'});
  remote.rm('-rf /tmp/' + tmpDir);

  // remote.log('Install dependencies');
  remote.sudo('npm i --production --prefix ~/public/' + tmpDir
    + ' install ~/public/' + tmpDir, {user: 'deploy'});
  //
  // remote.log('Reload application');
  remote.sudo('ln -snf ~/public/' + tmpDir + ' ~/public/appstract-client', {user: 'deploy'});
  //remote.sudo('pm2 reload example-com', {user: 'deploy'});
});

// // run more commands on localhost afterwards
// plan.local(function(local) { /* ... */ });
// // ...or on remote hosts
// plan.remote(function(remote) { /* ... */ });
