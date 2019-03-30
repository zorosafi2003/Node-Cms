const path = require("path");
const express = require("express");
const hbs = require("express-hbs");
const bodyParser = require('body-parser')
const methodOverride = require('method-override');
const expressUpload = require('express-fileupload');
var session = require('express-session');
var flash = require('req-flash');

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

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(express.static(path.join(rootDir, "public")));
  app.use(methodOverride('_method'));
  app.use(expressUpload());
  app.use(session({ secret: '123' }));
  app.use(flash());
};
