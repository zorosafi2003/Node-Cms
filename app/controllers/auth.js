module.exports.getLogin = (req, res, next) => {
  res.render("auth/login");
};

module.exports.getRegister = (req, res, next) => {
  res.render("auth/register");
};
