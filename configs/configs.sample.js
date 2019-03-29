//configs

var config = {};

//if the app is hosted in the server as http://example.com/myapp
//then set baseAppPath to "/myapp"
config.baseAppPath = "";

config.dbConfig= {
  connectionLimit : 10,
  host: 'localhost',
  port: 3306,
  user: 'xxx',
  password: 'xxx',
  database: 'xxx'
}

config.dbSessionOptions = {
  host: config.dbConfig.host,
  port: config.dbConfig.port,
  user: config.dbConfig.user,
  password: config.dbConfig.password,
  database: config.dbConfig.database

};

config.sessionOptions =
{
	key: 'session_cookie_name',
	secret: 'session_cookie_secret',
	//store: sessionStore,
  resave: false,
  cookie: { maxAge: 1200000 }, //20 minutes
	saveUninitialized: false
}

config.redisOptions = {
  host: 'localhost',
  port: 6379
}

config.mailOptions = {
  host: 'email-smtp.us-east-1.amazonaws.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
      user: "xxxxx",  //email user
      pass: "xxxxxxxxxxx"  //password
  }
}

module.exports = config