const categories = require('../../services/categories');
const wrapper = require('./wrapper');

module.exports = function(router){
    async function get_category_by_id (req, res, next) {
        if(req.params.id) {
            msg = `myid: ${req.params.id}`;
        }
        res._result_.message = msg
    }


    async function get_categories(req, res, next) {

        let msg = "OK";
        var top_n = 5
        if(req.params.top_n) {
            top_n = req.params.top_n;
        }
        //let cat = new categories();
        res._result_.data = await categories.get_categories(top_n);
        res._result_.message = msg;

    }
    
    router.get('/category/:id', wrapper(get_category_by_id));
    router.get('/categories/:top_n', wrapper(get_categories));
    router.get('/categories', wrapper(get_categories));
}