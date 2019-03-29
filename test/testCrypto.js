var crypto= require('../libs/Crypto');

var password = "hello world";
var result = crypto.saltHashPassword(password);
console.log("result:", result);
var res1 = crypto.validatePassword(password,"sss","sss");
var res2 = crypto.validatePassword(password,'189351fed18cf0615778a9026a5f8709a1c8ef4d694f4cff67188da6e14336934280d3ca8a1e25588c6308c15a7b79b2e4dd8b802c1c88d7a503007bfe4960e8','0dc718502c542417');
var res3 = crypto.validatePassword(password, result.hash, result.salt);
console.log("res1:", res1);
console.log("res2:", res2);
console.log("res2:", res3);
