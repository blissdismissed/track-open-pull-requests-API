const express = require('express');

const routes = require('./routes');

const app = express();

app.use('/github_api', routes);

app.listen(3000);