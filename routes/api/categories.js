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

    async function get_category_articles(req, res, next) {
        var top_n = 5
        if(req.params.top_n) {
            top_n = req.params.top_n;
        }
        if(!req.params.id) {
            res._result_.message = "need to provide :id for category id";
            res.err = 100;
            return
        }

        res._result_.data = await categories.get_category_articles_by_id(req.params.id, top_n);

    }

    async function get_article_by_id (req, res, next) {
        if(!req.params.id) {
            res._result_.message = "need to provide :id for category id";
            res.err = 100;
            return
        }
        res._result_.data = await categories.get_article_by_id(req.params.id);
    }

    router.get('/category/:id', wrapper(get_category_by_id));
    router.get('/categories/:top_n', wrapper(get_categories));
    router.get('/categories', wrapper(get_categories));
    router.get('/category_articles/:id', wrapper(get_category_articles));

    router.get('/article/:id', wrapper(get_article_by_id));
}