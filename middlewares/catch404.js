const express = require('express');
const router = express.Router();
//catch 404
router.use((req, res, next) => {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});
//handle error
router.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        status: err.status,
        stack: err.stack
    });
});

module.exports = router;