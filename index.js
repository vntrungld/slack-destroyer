var fs = require('fs');
var execSync = require('child_process').execSync;

var config = JSON.parse(fs.readFileSync(`${process.env.HOME}/.slack-destroyer`));
var tokens = config.tokens;
var channels = config.channels;
var groups = config.groups;
var directs = config.directs;
var before = config.before;
var command = '';

tokens.forEach(function(token) {
  console.log(`For the token: ${token}`)
  if (channels) {
    console.log('Destroying channels:')
    channels.forEach(function(channel) {
      console.log(`Channel ${channel}...`);
      command = `slack-cleaner --token ${token} --message --channel ${channel} --user "*" --before=${before} --perform;`;
      command += `slack-cleaner --token ${token} --message --channel ${channel} --bot --perform;`;
      try {
        execSync(command);
      } catch(err) {
        console.log(err);
      }
      console.log(`Done for ${channel}`);
    });
    console.log('Done for channels');
  }

  if (groups) {
    console.log('Destroying groyps:');
    groups.forEach(function(group) {
      console.log(`Group ${group}`);
      command = `slack-cleaner --token ${token} --message --group ${group} --user "*" --before=${before} --perform;`;
      try {
        execSync(command);
      } catch(err) {
        console.log(err);
      }
      console.log(`Done for ${group}`);
    });
    console.log('Done for groups');
  }

  if (directs) {
    console.log('Destroying directs');
    command = `slack-cleaner --token ${token} --message --mpdirect ${directs.toString()} --user "*" --before=${before} --perform;`;
    try {
      execSync(command);
    } catch(err) {
      console.log(err);
    }
    console.log('Done for direct');
  }

  console.log('Destroying files');
  command = `slack-cleaner --token ${token} --file --user "*" --before=${before} --perform;`;
  try {
    execSync(command);
  } catch(err) {
    console.log(err);
  }
  console.log('Done for file');
});
