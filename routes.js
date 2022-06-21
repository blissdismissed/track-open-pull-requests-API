const express = require('express');
const controller = require('./controller');

const router = express.Router();

router.get('/', controller.basicPage);

router.get('/zen', controller.getZen);

module.exports = router;