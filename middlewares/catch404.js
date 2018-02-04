const express = require('express');
const router = express.Router();

router.use((req, res, next) => {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

module.exports = router;