/* GET home page. */
const renderIndex = (req, res, next) => {
  res.render('index', {title: 'Jobbox'});
};

module.exports = {
    renderIndex
};
