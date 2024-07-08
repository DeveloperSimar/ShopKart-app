const userSchema = require('../modals/user-modal');
const {generateHash} = require('../utils/generateHash');
const {generateToken} = require('../utils/generateToken');
const bcrypt = require('bcrypt');

const userRegister = async (req, res) => {
    var {name, email, password, about, contact} = req.body;
    if(!name || !email || !password){
      req.flash("failed", "Please fill all the fields.");
      return res.redirect('/');
    }
  
    try{
      const userExist = await userSchema.findOne({email});
      if(userExist){
        req.flash("failed", "User already exist, Plaese Login.");
        return res.redirect('/');
      }
  
      let hash = await generateHash(password);
      let user = await userSchema.create({
        name,
        email,
        password: hash,
        about,
        contact
      });
      let token = generateToken(user);
      res.cookie("token", token);
      req.flash("success", "Register Successfully!");
      res.redirect('/shop');    
    }
    catch(err){
      req.flash("failed", "Something went wrong.");
      res.redirect('/');
    }
    
};

const userLogin = async (req, res)=>{
  var {email, password} = req.body;
  if(!email || !password){
    req.flash("failed", "Please fill all the fields.");
    return res.redirect('/');
  }
  try{
    const userExist = await userSchema.findOne({email});
    if(!userExist){
      req.flash("failed", "User doesn't exist. Please Register.");
      return res.redirect('/');
    }
    const isMatch = await bcrypt.compare(password, userExist.password);
    if(!isMatch){
      req.flash("failed", "Incorrect Password or Email.");
      return res.redirect('/');
    }
    let token = generateToken(userExist);
    res.cookie("token", token);
    req.flash("success", "Login Successfully!");
    return res.redirect('/shop');
  }catch(err){
    req.flash("failed", "Something went wrong.");
    return res.redirect('/');
  }
};

module.exports = {userRegister, userLogin};