module.exports =  async function login(req, res, next) {
    let result = {
        err: 0,
        message: "",
        data: null
    }
    // Skip session checking if it's login request
    if(req.path && req.path.match(/^\/login$/i)){
        next();
    }else if(req.session && req.session.user && req.session.user.username){
        next();
    }else{
        result.err = 403
        result.message = "Not authenticated";
        res.send(result);
    }
}
