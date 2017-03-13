var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var roomSchema = new Schema({
    roomName: String,
    roomContent: String,
    roomCreateDate: Date,
    roomImg: String,
    roomCreateUser: String,
    roomJoinPeos: Number
});

var room = mongoose.model('Room', roomSchema);
module.exports = room;