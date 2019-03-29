//var _ = require('lodash');
var redis = require('redis');

//exported functions
function Redis(options) {
  this.cache = redis.createClient(options);
}

Redis.prototype.get = function (key, cb) {
  if (typeof key != "string") throw new TypeError("key has to be string");
  if (typeof cb != "function") throw new TypeError("cb has to be a callback function");
  this.cache.get(key, function(error, value){
    if (!error){
      if (typeof value == "number") value = Number(value);
      else if (typeof value == "object") value = JSON.parse(value);
      else if (typeof value == "boolean") value = value == "true"? true: false;
    }
    cb(error, value);
  });
}

Redis.prototype.getObject =function (key, cb) {
  if (typeof key != "string") throw new TypeError("key has to be string");
  if (typeof cb != "function") throw new TypeError("cb has to be a callback function");
  this.cache.get(key, function(error, value){
    if (!error){
      value = JSON.parse(value);
    }
    cb(error, value);
  });
}

Redis.prototype.getBool =function (key, cb) {
  if (typeof key != "string") throw new TypeError("key has to be string");
  if (typeof cb != "function") throw new TypeError("cb has to be a callback function");
  this.cache.get(key, function(error, value){
    if (!error){
      value = value == "true"? true: false;
    }
    cb(error, value);
  });
}

Redis.prototype.set = function (key, value, cb) {
  if (typeof key != "string") throw new TypeError("key has to be string");
  if (typeof value != "string" && typeof value != "object" && typeof value != "number" ) throw new TypeError("key has to be string or value");
  if (typeof cb != "function") throw new TypeError("cb has to be a callback function");
  if (typeof value == "string"){
    this.cache.set(key, value, cb);
  }else if (typeof value == "object"){
    this.cache.set(key, JSON.stringify(value), cb);
  }else if (typeof value == "number"){
    this.cache.set(key, String(value), cb);
  }else if (typeof value == "boolean"){
    var val = value? "true": "false";
    this.cache.set(key, val, cb);
  }
}

Redis.prototype.getAsync = function (key) {
  if (typeof key != "string") throw new TypeError("key has to be string");
  var promise = new Promise( (resolve, reject) => {
    this.get(key, function(error, value){
      if (error) reject (error);
      else resolve(value);
    });
  });
  return promise;
}

Redis.prototype.setAsync = function (key, val) {
  if (typeof key != "string") throw new TypeError("key has to be string");
  var promise = new Promise( (resolve, reject) => {
    this.set(key, val, function(error, value){
      if (error) reject (error);
      else resolve(value);
    });
  });
  return promise;
}


module.exports = Redis;
