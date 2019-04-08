const path = require("path");
const express = require("express");
const hbs = require("express-hbs");
const bodyParser = require('body-parser')
const methodOverride = require('method-override');
const expressUpload = require('express-fileupload');
const flash = require('req-flash');
const expressValidator = require('express-validator');
const expressSession = require('express-session');
const passport = require('passport')
const MongoStore = require('connect-mongo')(expressSession);
const mongoose = require('mongoose');
const config = require('./index');
module.exports.init = app => {
  const rootDir = app.get("root");

  app.engine("hbs", hbs.express4({
    defaultLayout: path.join(rootDir, "app", "views", 'layouts', 'home'),
    layoutsDir: path.join(rootDir, "app", "views", 'layouts'),
    partialsDir: path.join(rootDir, "app", "views", 'partials')
  }));

  require('../app/helpers/handelbars-helpers').init(hbs);



  app.set("view engine", "hbs");
  app.set("views", path.join(rootDir, "app", "views"));


  const sessionOpts = {
    secret: '123456',
    resave: true,
    saveUninitialized: true,
};

if (config.session.type === 'mongo') {
    sessionOpts.store = new MongoStore({
        collection: 'session',
        mongooseConnection: mongoose.connection
    });
}

  app.use(expressSession(sessionOpts));
  app.use(passport.initialize());
  app.use(passport.session());

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(express.static(path.join(rootDir, "public")));
  app.use(expressValidator());
  app.use(methodOverride('_method'));
  app.use(expressUpload());
  app.use(flash());


  app.use((req, res, next) => {
    res.locals.user = req.user || null;
    next();
  });

};
