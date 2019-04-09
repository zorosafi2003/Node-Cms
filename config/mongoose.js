const mongoose = require('mongoose');
const config = require('../config');

module.exports.init = (app) => {

    mongoose.Promise = global.Promise;
    
    mongoose.connect(config.mongodb.url, {
        dbName: config.mongodb.dbName,
        useNewUrlParser: true
    }).then(() => {
        console.log('Success connect to db');
       // require('../app/seeders').init(app);
    }).catch(err => {
        console.log('Error in connect to db');
    });

    // If the Node process ends, cleanup existing connections
    process.on('SIGINT', cleanup);
    process.on('SIGTERM', cleanup);
    process.on('SIGHUP', cleanup);

    app.set('mongoose', mongoose);

}


function cleanup() {
    mongoose.connection.close(function () {
      console.log('Closing DB connections .');
    });
  }