
class Categories{
  constructor(db, config) {
    this.db = db || global.db;
    this.config = config || global.config;
  }

  static get_articles_by_id (id) {
    let db = this.db || global.db;
    return db.getOne("SELECT * FROM article WHERE id = ?", [id]);
  }

  static get_categories(top_n){
    let db = this.db || global.db;
    let sql = "SELECT * FROM category"; 
    if(top_n){
      sql += ` LIMIT ${top_n}`;
    }
    return db.getAll(sql);
  }
}

module.exports = Categories;
