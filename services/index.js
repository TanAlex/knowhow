const path = require('path');
const globby = require('globby');
let db = global.db;



let service_factory = function (context = {}) {

    let service = {
        db: context.db || global.db,
        configs: context.configs || global.configs


    }
    const paths = globby.sync([path.join(__dirname, './*.js')]);
    paths.forEach(file => {
        var base_name = path.basename(file, '.js');
        if (!base_name.match(/^index$/i) && base_name.match(/^\w+$/)) {
            service[base_name] = require(file)(service);
        }
    });

    //console.log(service)
    return service;
}


if (global.db) {
    service_factory.default = service_factory()
}


module.exports = service_factory;
