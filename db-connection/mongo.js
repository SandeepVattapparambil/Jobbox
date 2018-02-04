const mongoose = require('mongoose');
mongoose.connect(mongoConfig.url + mongoConfig.dbName, mongoConfig.options)
    .then(() => {
        console.log('MongoDB connection extablished successfully!');
    }, (err) => {
        console.log('MongoDB connection Failed!', err);
    });
module.exports = mongoose;