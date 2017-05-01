var fs = require('fs');
var exec = require('child_process').exec;

var config = JSON.parse(fs.readFileSync(`${process.env.HOME}/.slack-destroyer`));
var tokens = config.tokens;
var channels = config.channels;
var groups = config.groups;
var directs = config.directs;
var before = config.before;
var commands = '';

tokens.forEach(function(token) {
  if (channels) {
    channels.forEach(function(channel) {
      commands += `slack-cleaner --token ${token} --message --channel ${channel} --user "*" --before=${before} --perform;`;
    });
  }

  if (groups) {
    groups.forEach(function(group) {
      commands += `slack-cleaner --token ${token} --message --group ${group} --user "*" --before=${before} --perform;`;
    });
  }

  if (directs) {
    commands += `slack-cleaner --token ${token} --message --mpdirect ${directs.toString()} --user "*" --before=${before} --perform;`;
  }

  commands += `slack-cleaner --token ${token} --file --user "*" --before=${before} --perform;`;
});

exec(commands, function(error, stdout, stderr) {
  console.log(error);
  console.log(stdout);
  console.log(stderr);
});
