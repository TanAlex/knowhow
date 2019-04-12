/*
Utility function to wrap router controller functions
so they can have standard output even when they throw exceptions
*/
module.exports = function wrapper(func){
    return async function (req, res, next){
        let result = {
            err: 0,
            message: "",
            data: null
        }
        try {
            await func(req, res, result);
        }catch(err){
            result.err = 500;
            console.log(err);
            result.message = err.message;
            res.status(500);
        }

        res.send(result);
    }
}
