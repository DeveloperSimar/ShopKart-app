const express = require('express');
const router = express.Router();
const ownerSchema = require('../modals/owner-modal');
const bcrypt = require('bcrypt');
const { isLoggedIn } = require('../middlewares/isLoggedIn');


if (process.env.NODE_ENV === 'development') {
  router.post('/create', async (req, res) => {
    let owner = await ownerSchema.find();
    if (owner.length > 0) {
      res.status(400).json({
        message: 'Owner already exists'
      });
    } else {

      const salt = await bcrypt.genSalt(10);

      bcrypt.hash(req.body.password, salt, async (err, hash) => {
        if (err) throw err;
        const newOwner = new ownerSchema({
          name: req.body.name,
          email: req.body.email,
          password: hash
        })
        await newOwner.save();
        res.status(200).json({
          message: 'Owner created successfully'
        })
      });
    }
  });
}

router.get('/admin', isLoggedIn, async (req, res) => {
  try{
    let owner = await ownerSchema.findOne({email: req.user.email});
    if(!owner){
      req.flash('error', 'Owner not found.');
      return res.redirect('/shop');
    }
    
    let flash = (req.flash('error').length > 0 ? req.flash('error') : req.flash('success'));
    res.render('admin', {flash});

  }catch(err){
    req.flash('error', err.message);
    res.redirect('/shop');
  }
});


module.exports = router;