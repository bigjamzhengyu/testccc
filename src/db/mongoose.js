var config = require('../config');
var mongoose = require('mongoose');
try{
    mongoose.connect(config.dbPath);
    console.log('config.dbPath: '+ config.dbPath);
}catch(err){
    console.log('mongoose connect error');
}
module.exports = mongoose;