var locals = {};

locals.dblocals= {
  password: 'P@ssw0rd!',
}

locals.dbSessionOptions = {
  password: locals.dblocals.password,
};

locals.redisOptions = {
  password = ''
}

module.exports = locals