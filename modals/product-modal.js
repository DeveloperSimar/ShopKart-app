const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: Buffer,
        required: true
    },
    discount: {
        type: Number,
        default: 0
    },
    description: String,
    is_avail : Boolean,
    panelcolor: String,
    textcolor: String
});

module.exports = mongoose.model('product', productSchema);