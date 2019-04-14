const path = require('path');
const globby = require('globby');

let _default = null;

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


    if (service.db && service.configs && !_default) {
        _default = service;
    }
    console.log(`service_factory called, _default:  ${_default}`);
    return service;
}


Object.defineProperty(service_factory, 'default', {
    get() {
        if (!_default && global.db) {
            _default = service_factory();
        } 
        return _default;
    }
});

module.exports = service_factory;
