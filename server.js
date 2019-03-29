const http = require("http");
const express = require("express");
const app = express();
const config = require('./config');

// server params
const PORT =config.port || '3000';
const HOST_NAME = config.host || 'localhost';

//global params
app.set('root',__dirname);
app.set('config',config);

require('./config/mongoose').init(app);
require('./config/models').init(app);
require('./config/express').init(app);
require('./config/routes').init(app);

app.use((req,res,next)=>{
    res.status(404).send('page not found');
})

if (!module.parent) {
  let server = http.createServer(app);
  server.listen(PORT, HOST_NAME,() => {
    console.log(`connecting to server ${HOST_NAME} in port ${PORT}`);
  });
}

module.exports = app;
