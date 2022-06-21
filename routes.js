const express = require('express');

const router = express.Router();

router.get('/', (req,res) => { res.send('Boom, GitHub API') });

module.exports = router;