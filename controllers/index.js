/* GET home page. */
const renderIndex = (req, res, next) => {
  res.render('index', {
    brand: appConfig.name,
    title: 'Jobbox'
  });
};

module.exports = {
  renderIndex
};