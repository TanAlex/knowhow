var DB = require('../libs/DB');
//var crypto = require('../libs/Crypto');
var configs = require('../configs/configs.js');
//var Users = require('../models/Users');
Categories = require("../services/categories");

db = new DB(configs.dbConfig);
cat = new Categories(db);

cat.get_articles_by_id(1).then(
    (result) => console.log(result)
);

// db.query("SELECT * FROM category", function(error,  results, fields){
//   if (!error){
//     console.log("results:", results);
//     console.log("fields:", fields);
//   }else{
//     console.log(error);
//   }
// });