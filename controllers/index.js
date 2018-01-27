/* GET home page. */
function renderIndex(req, res, next) {
  res.render('index', {title: 'Sandeep Jobbox'});
}

module.exports = {
    renderIndex
};
