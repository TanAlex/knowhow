/*
    Usage:  in app.js, 
    const graphql = require("./graphql");
    graphql.addToApp(app);
*/
const { ApolloServer } = require ('apollo-server-express');
const path = require('path');
const globby = require('globby');
var express = require('express');
var router = express.Router();

module.exports = {
    addToApp(app, mount_path){
        mount_path = mount_path || '/graphql';
        const paths = globby.sync([path.join(__dirname, './schema/*.js')])
        let typeDefs = [];
        let resolvers = [];
        paths.forEach(file => {
            const { typeDefs: types, types: t, resolvers:r } = require(file);
            types && typeDefs.push(types);
            t && typeDefs.push(t);
            r && resolvers.push(r);
        });
        let schema = {
            typeDefs,
            resolvers
        }
        const env = process.env.ENVIRONMENT || "DEV"
        if (env != 'PROD' && env != "PRODUCTION"){
            schema.playground ={
                settings: {
                    'editor.theme': 'light',
                    // this 'include' is very very important
                    // but default it's 'omit' which won't get session variables
                    "request.credentials" : "include"
                },
                // tabs: [
                //   {
                //     endpoint,
                //     query: defaultQuery,
                //   },
                // ],
            }
        }else{
            schema.playground = false;
        }

        schema.context = ({ req }) => {
            // get the user token from the headers
            const token = req.headers.authorization || '';
           
            // try to retrieve a user with the token
            //const user = getUser(token);
            console.log("session", req.session);
            let context = {};
            if(req.session && req.session.user && req.session.user.username){
                context.user = req.session.user; 
            }
            // else{
            //     throw new AuthenticationError("Not authenticated");
            // }
            if (app._services) {
                context.services = app._services;
                console.log("app._services", context.services);
            }
            return context;
        },
        console.log("GraphQL schema:", schema);
        const apollo = new ApolloServer(schema)
        app._apolloServer = apollo;

        
        app.use(mount_path, require('../routes/api/middleware/check_session'));

        //apollo.applyMiddleware({ app, path: '/graphql' });
        apollo.applyMiddleware({ app, path: mount_path });
        
    }
}

