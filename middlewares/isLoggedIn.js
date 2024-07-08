const jwt = require('jsonwebtoken');
const userSchema = require('../modals/user-modal');

module.exports.isLoggedIn = async (req, res, next)=>{
    if(!req.cookies.token){
        req.flash("error", "You must be Login.")
        res.redirect('/');
    }
    try{
    let data = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
    let user = await userSchema.findOne({email:data.email}).select("-password"); 
    req.user = user;
    next();
    } catch(err){
        req.flash("error", "Something went wrong.")
        res.redirect('/');
    }
};