const github = require('./github.actions');

function basicPage(req, res) {
  res.send('Boom, GitHub API!');
}

async function fetchPulls(req,res) {
  const user = req.params.user;
  const reponame = req.params.reponame;
  const githubOutputData = await github.pullData(user, reponame);
  res.json(githubOutputData.output);
}

module.exports = {
  basicPage: basicPage,
  fetchPulls: fetchPulls
}