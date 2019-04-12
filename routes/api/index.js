var express = require('express');
var router = express.Router();
const check_session = require('./middleware/check_session');

router.all('*', check_session);

require('./categories')(router)
require('./auth_login')(router)

module.exports = router;