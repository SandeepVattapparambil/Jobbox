/* GET home page. */
const renderIndex = (req, res, next) => {
  res.render('index', {
    brand: appConfig.name,
    title: appConfig.name
  });
};

const login = (req, res, next) => {
  res.render('login', {
    brand: appConfig.name,
    title: appConfig.name
  });
};
module.exports = {
  renderIndex,
  login
};