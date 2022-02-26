const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://riyababum:riya%400813@ictak-files.obazk.mongodb.net/Products?retryWrites=true&w=majority');
const Schema = mongoose.Schema;

var productSchema = new Schema({
    name:String,
    price:Number,
    quantity:String,
    category:String
});
var ProductInfo = mongoose.model('products',productSchema);

module.exports = ProductInfo;