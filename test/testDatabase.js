var DB = require('../libs/DB');
//var crypto = require('../libs/Crypto');
var configs = require('../configs/configs.js');
//var Users = require('../models/Users');

db = new DB(configs.dbConfig);

db.query("SELECT * FROM category", function(error,  results, fields){
  if (!error){
    console.log("results:", results);
    console.log("fields:", fields);
  }else{
    console.log(error);
  }
});

// db.getOne("SELECT * FROM sec_users").then(function (user) {
//   console.log(user);
// }).catch(function (error) {
//   console.log(error);
// })

// db.getAll("SELECT * FROM sec_roles").then(function (roles) {
//   console.log(roles);
//   roles.forEach((r) => console.log(r.name, r.description));
// }).catch(function (error) {
//   console.log(error);
//   console.log("not bad at all");
// })


// db.getOne("SELECT * FROM sec_users WHERE user_id = ?", [1]).then(function (user) {
//   console.log(user);
// }).catch(function (error) {
//   console.log(error);
// })

// var users = new Users(db);
// users.getUserById(1, function (error, user) {
//   console.log('user:', user);
//   console.log("fun");
// })

// var users = new Users(db);
// try {
//   users.getUserById(2).then(function (user) {
//     console.log('user:', user);
//   }).catch(function (err) { console.log("promise-catch:", err) });

//   users.getUserByEmail('ttan').then(function (user) {
//     console.log('user:', user);
//   });
// } catch (error) {
//   console.log("try-catch:", error);
// }

// db = new DB({
//   connectionLimit : 10,
//   host: 'localhost',
//   port: 46306,
//   user: 'admin',
//   password: 'admin123',
//   database: 'e_store'
// });

// var sql = "SELECT * FROM `e_store`.`products` WHERE `category_id` = 1 AND `attributes` -> '$.ports.usb' > 0 AND `attributes` -> '$.ports.hdmi' > 0";

// db.each(sql, function (prod) {
//   console.log(prod);
// }).catch(function (error) {
//   console.log(error);
// })