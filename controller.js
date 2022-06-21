const fetch = require('node-fetch');

function basicPage(req, res) {
  res.send('Boom, GitHub API!');
}

async function getZen(req, res) {
  const response = await fetch('https://api.github.com/zen', {
    method: "GET",
    headers: {
      'User-Agent': 'blissdismissed-track-open-pull-requests-API'
    }
  });
  console.log(response);
  res.send(response);
}

module.exports = {
  basicPage: basicPage,
  getZen: getZen
}