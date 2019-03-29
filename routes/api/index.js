var express = require('express');
var router = express.Router();

require('./categories')(router)

module.exports = router;