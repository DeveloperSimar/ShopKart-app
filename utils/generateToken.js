const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateToken = function (user){
    let token = jwt.sign({ email: user.email, id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return token;
};

module.exports = {generateToken};