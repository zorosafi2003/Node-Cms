const path = require('path');

module.exports.init = (app) => {
    const seederDir = path.join(app.get('root'), 'app', 'seeders');
    ['post'].forEach(modelName => {
        require(path.join(seederDir, modelName + '-seeder')).seed();
    })
}