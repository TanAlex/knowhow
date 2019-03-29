var Models = require('../modules/Models');
var DB = require('../libs/DB');
var configs = require('../configs/configs.js');

global.models = Models(new DB(configs.dbConfig));
console.log(global.models);
global.models.users.getAllUsers().then((users) => console.log(users));

