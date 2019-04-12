
const wrapper = require('./wrapper');

module.exports = function (router) {
    async function login(req, res, result) {
        console.log("login function");
        console.log(req.session);
        let userName = "ttan";
        let passWord = "ttan123";

        if (typeof req.body.username != "string" || typeof req.body.password != "string") {
            result.err = 500;
            result.message = "missing username or password in request post";
        } else if (req.body.username == userName && req.body.password == passWord) {
            req.session.user = { username: userName, user_id: 123 };
            result.message = "OK"
        } else {
            result.err = 100;
            result.message = "Wrong username and password";
        }
    }

    async function logout(req, res, result) {
        if(req.session) { req.session.destroy(); }
        result.message="Successfully logged out";
    }

    router.post('/login', wrapper(login));
    router.all('/logout', wrapper(logout));
}