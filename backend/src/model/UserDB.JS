const mongoose = require('mongoose');
mongoose.connect(' ');
const Schema = mongoose.Schema;

var userSchema = new Schema({
    name:String,
    email:String,
    password:String,
    place:String
});
var UserInfo = mongoose.model('users',userSchema);

module.exports = UserInfo;