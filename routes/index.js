var express = require('express');
var router = express.Router();
var categories = require('../services/categories');

/* GET home page. */
router.get('/', async function(req, res, next) {
  try{
    cats = await get_categories_with_detail();
    console.log(cats);
    res.render('index', { title: 'Simartar Knowledge Base', categories: cats });
  }catch(err){
    res.render('error', {error: err})
  }
});

async function get_categories_with_detail(){
  //Get first 6 categories
  let cats = await categories.get_categories(6);
  if(cats && Array.isArray(cats)){
    for(let cat of cats){
      let cat_articles = await categories.get_category_articles_by_id(cat.id);
      if(cat_articles){
        cat.detail = cat_articles;
      }
    }
  }
  return cats;
}

/* GET category page. */
router.get('/category/:id', async function(req, res, next) {
  try{
    let cid = req.params.id;
    if(!cid){
      throw new Error("Category requires :id params");
    }
    let cats = await get_categories_with_detail();
    let cat_detail = await categories.get_category_articles_by_id(cid);

    console.log(cat_detail);
    res.render('category', { title: cat_detail.category_name, cat_detail, categories:cats });
  }catch(err){
    res.render('error', {error: err})
  }
});

/* articles */

/* GET category page. */
router.get('/article/:id', async function(req, res, next) {
  try{
    let aid = req.params.id;
    if(!aid){
      throw new Error("article requires :id params");
    }
    let article = await categories.get_article_by_id(aid);
    console.log(article);
    res.render('article', { title: article.title, article });
  }catch(err){
    res.render('error', {error: err})
  }
});

module.exports = router;
