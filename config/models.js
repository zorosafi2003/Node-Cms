const path = require('path');

module.exports.init = (app) => {

    const modelsDir = path.join(app.get('root'), 'app', 'models');
    ['post','category','user'].forEach(modelName => {
        require(path.join(modelsDir, modelName));
    })

}