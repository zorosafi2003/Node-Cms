const path = require('path');

module.exports.init = (app)=>{
    let routesPath = app.get('root') + '/app/routes';

    app.use('/',require(path.join(routesPath,'home')));
    app.use('/auth',require(path.join(routesPath,'auth')));

}