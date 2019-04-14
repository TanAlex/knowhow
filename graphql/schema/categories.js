const { gql } = require('apollo-server');
//const { categories }= require('../../services').default;


// The GraphQL schema in string form
const typeDefs = gql`
  
  type Article {
    id: Int!
    title: String
    status: Int
    content: String
    category_id: Int
    category: Category
  }
  type Category { 
    category_id: Int!
    category_name : String
    category_description: String
    total_articles: Int
    articles: [ Article ]
  }
  extend type Query {

    article(id: Int!): Article
    category(id: Int!): Category
  }
`;

// The resolvers
const resolvers = {
  Query: { 
    article: (root, { id }, {services: {categories}}) => categories.get_article_by_id(id),
    category: (root, { id }, {services: {categories}}) => categories.get_category_articles_by_id(id),
  },
  Article: {
    category:  async (parent, param, {user, services: {categories}}) => {
      let result = await categories.get_category_by_id(parent.category_id);
      console.log("login user:", user);
      Object.assign(result, {
        category_id: result.id,
        category_name: result.name,
        category_description: result.description
      });
      return result;
    }
  },
  Category: {
    total_articles: (category, param, {services: {categories}}) => categories.get_category_total_articles_by_id(category.category_id),
  }
};

// Put together a schema
const schema = {
  typeDefs,
  resolvers,
};

module.exports = schema;