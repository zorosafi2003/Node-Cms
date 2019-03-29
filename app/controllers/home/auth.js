module.exports.getLogin = (req, res, next) => {
  res.render("home/login");
};

module.exports.getRegister = (req, res, next) => {
  res.render("home/register");
};
