const express = require('express');
const router = express.Router();
//Middleware list
router.use(require('./catch404'));
module.exports = router;