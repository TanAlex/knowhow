var DB = require('../libs/DB');
var crypto = require('../libs/Crypto');
var configs = require('../configs/configs.js');
var Users = require('../models/Users');

db = new DB(configs.dbConfig);

// db.query("SELECT * FROM sec_users", function(error,  results, fields){
//   if (!error){
//     console.log("results:", results);
//     console.log("fields:", fields);
//     var password = "hello world";
//     var result = results[0];
//     var res1 = crypto.validatePassword(password,result.password,result.salt);
//     console.log(res1);
//   }else{
//     console.log(error);
//   }
// });

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

var users = new Users(db);
try {
  // users.registerUser("ttl5@ttl.com", "test123").then( (res) => {
  //   console.log("res:", res);
  //   console.log("affectedRows:", res.results.affectedRows);
  // }).catch(function(error){
  //   console.log(error);
  // });


  // users.activateUser("ffd01dede297f0f4").then( (res) => {
  //   console.log("res:", res);
  //   console.log("affectedRows:", res.results.affectedRows);
  // }).catch(function(error){
  //   console.log(error);
  // });

  users.generateResetPasswordCode("ttl5@ttl.com").then((res) => {
    console.log("res:", res);
    if (res.OK){
      return users.decodeResetPasswordCode(res.actCode).then((res)=>{
        console.log("res:", res);
        if (res.OK)
          return users.activateUser(res.actCode).then( (res) => {
            console.log("res:", res);
          });
      })
    }
  }).catch(function(error){
    console.log(error);
  });

} catch (error) {
  console.log("try-catch:", error);
}