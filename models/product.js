var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongoosastic = require('mongoosastic');

var ProductSchema = new Schema({
    category: {type: Schema.Types.ObjectId, ref: 'Category'},
    name: String,
    price: Number,
    image: String
});

ProductSchema.plugin(mongoosastic, {
    hosts: [
        '127.0.0.1:9200'
    ]
});

module.exports = mongoose.model('Product', ProductSchema);