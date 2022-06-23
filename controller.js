const fetch = require('node-fetch');
const github = require('./github.actions');

function basicPage(req, res) {
  res.send('Boom, GitHub API!');
}

async function getZen(req, res) {
  const response = await fetch('https://api.github.com/zen', {
    method: "GET",
    headers: {
      'Accept' : 'application/vnd.github.v3+json',
      'User-Agent': 'blissdismissed'
    }
  });
  console.log(response);
  res.send(response);
}

async function fetchPulls(req,res) {
  const user = req.params.user;
  const reponame = req.params.reponame;
  console.log(user,reponame);
  const githubOutputData = await github.pullData(user, reponame);
  console.log(githubOutputData);
  res.json(githubOutputData);
}

module.exports = {
  basicPage: basicPage,
  getZen: getZen,
  fetchPulls: fetchPulls
}