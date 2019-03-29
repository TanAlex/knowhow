var mailer = require('../modules/Mailer');

mailer.sendMail(
  {subject: 'Password Reset', 
  text: 'Test TEST?',
  html: '<b>Test Password Reset</b>' 
}).then((ret) => console.log(ret));