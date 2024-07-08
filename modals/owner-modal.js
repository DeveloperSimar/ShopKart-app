const mongoose = require('mongoose');

const ownerSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    products: {
        type: Array,
        default: []
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    picture: {
        type: String
    },
    gstno: String
    
});

module.exports = mongoose.model('owner', ownerSchema);