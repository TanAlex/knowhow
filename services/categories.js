
function Categories({db}) {
  return {
    get_article_by_id(id) {
      return db.getOne(`SELECT articles.*, categories.name as category_name FROM articles JOIN categories 
              ON articles.category_id = categories.id WHERE articles.id = ?`, [id]);
    },

    get_category_by_id(id) {
      return db.getOne("SELECT * FROM categories WHERE id = ?", [id]);
    },

    async get_category_total_articles_by_id(id) {
      let db = this.db || global.db;
      let r = await db.getOne("SELECT count(*) as the_count FROM articles WHERE category_id=?", [id]);
      let result = 0;
      if (r && r.the_count >= 0) {
        result = parseInt(r.the_count);
      }
      return result;
    },

    async get_category_articles_by_id(id, limit = 5) {
      let db = this.db || global.db;
      let result = {
        category_id: id,
        category_name: "",
        category_description: "",
        total_articles: 0,
        articles: []
      }
      let r = await db.getOne("SELECT count(*) as the_count FROM articles WHERE category_id=?", [id]);
      if (r && r.the_count >= 0) {
        result.total_articles = r.the_count;
        r = await db.getOne("SELECT * FROM categories WHERE id = ?", [id]);
        if (r && r.id) {
          result.category_name = r.name;
          result.category_description = r.description;
          if (result.total_articles > 0) {
            r = await db.getAll("SELECT * FROM articles WHERE category_id=? LIMIT ?", [id, limit]);
            if (r && Array.isArray(r)) {
              r.forEach((row) => {
                let record = {};
                for (let key in row) {
                  if (row.hasOwnProperty(key)) {
                    record[key] = row[key];
                  }
                }
                result.articles.push(record);
              });
            }
          }
        }
      }
      return result;
    },

    get_categories(top_n) {
      let db = this.db || global.db;
      let sql = "SELECT * FROM categories";
      if (top_n) {
        sql += ` LIMIT ${top_n}`;
      }
      return db.getAll(sql);
    }
  }
}

module.exports = Categories;
