/* GET home page. */
function renderIndex(req, res, next) {
  res.render('index', {title: 'Jobbox'});
}

module.exports = {
    renderIndex
};
