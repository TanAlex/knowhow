'use strict';
var crypto = require('crypto');

/**
 * generates random string of characters i.e salt
 * @function
 * @param {number} length - Length of the random string.
 */
var genRandomString = function(length){
  return crypto.randomBytes(Math.ceil(length/2))
    .toString('hex') /** convert to hexadecimal format */
    .slice(0,length);   /** return required number of characters */
};

/**
 * hash password with sha512.
 * @function
 * @param {string} password - List of required fields.
 * @param {string} salt - Data to be validated.
 */
var sha512 = function(password, salt){
    var hash = crypto.createHmac('sha512', salt); /** Hashing algorithm sha512 */
    hash.update(password);
    var value = hash.digest('hex');
    return {
        salt:salt,
        hash:value
    };
};

var saltHashPassword = function (userpassword) {
  var salt = genRandomString(16); /** Gives us salt of length 16 */
  return sha512(userpassword, salt); /** return object like { salt: randomSalt, hash: hashedPassword } */
}

/**
 * use salt against given password to generate the same hash and compare it with the given hash 
 * @function
 * @param {string} password - user provided password
 * @param {string} salt - salt read from database or redis
 * @param {string} hash - hash read from database or redis, mostly from the 'password' column
 */
var validatePassword = function(password, hash, salt) {
  password = password || "";
  hash = hash || "";
  salt = salt || "";
  var result = sha512(password, salt);
  return hash == result.hash;
}


module.exports = exports = {
  genRandomString,
  sha512,
  saltHashPassword,
  validatePassword
}
