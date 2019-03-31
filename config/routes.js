const path = require('path');

module.exports.init = (app)=>{
    let homeRoutesPath = app.get('root') + '/app/routes/home';

    app.use('/',require(path.join(homeRoutesPath,'index')));
    app.use('/auth',require(path.join(homeRoutesPath,'auth')));

    let adminRoutesPath = app.get('root') + '/app/routes/admin';

    app.use('/admin/categories',require(path.join(adminRoutesPath,'category')));
    app.use('/admin/posts',require(path.join(adminRoutesPath,'post')));
    app.use('/admin',require(path.join(adminRoutesPath,'index')));

}