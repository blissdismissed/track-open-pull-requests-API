function basicPage(req, res) {
  res.send('Boom, GitHub API!');
}

module.exports = {
  basicPage: basicPage
}