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

  const data = await response.json();
  console.log(data);

  const startPage = 1
  const commitsPerPage = 100;
  const numberOfCommits = 0;

  const commitOptions = options("/repos/" + user + "/" + reponame + 
        "/pulls/1/commits?per_page=" + commitsPerPage + "&page=" + startPage);

      const getCommitData = await fetch(commitOptions.baseUrl + commitOptions.hostName + commitOptions.path, {
        method: "GET",
        headers: commitOptions.headers
      });

      commitData = await getCommitData.json();
      console.log("Before: ", commitData);
      // numberOfCommits = commitData.length;
    

  res.send({
    id: data[0].id,
    number: data[0].number,
    title: data[0].title,
    author: data[0].user.login,
    commit_count: numberOfCommits
  });
}

module.exports = {
  basicPage: basicPage,
  getZen: getZen,
  fetchPulls: fetchPulls
}