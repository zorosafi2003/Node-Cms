module.exports.getHome = (req, res, next) => {
  res.render("home/index");
};

module.exports.getAbout = (req, res, next) => {
  res.render("home/about");
};
