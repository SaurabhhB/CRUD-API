var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FriendSchema = new Schema({
    name: String,
    company: String
});

module.exports = mongoose.model('Friend', FriendSchema);