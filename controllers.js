const fetch = require('node-fetch');
const options = require('./util/options');

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
  const setOptions = options("/repos/" + user + "/" + reponame + "/pulls");

  const response = await fetch(setOptions.baseUrl+setOptions.hostName+setOptions.path, {
    method: "GET",
    headers: setOptions.headers
  });

  console.log(response);
  res.send(response);


}

module.exports = {
  basicPage: basicPage,
  getZen: getZen,
  fetchPulls: fetchPulls
}