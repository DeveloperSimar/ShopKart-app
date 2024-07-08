const express = require('express');
const router = express.Router();
const userSchema = require('../modals/user-modal');
const {userRegister} = require('../controllers/userController');
const {userLogin} = require('../controllers/userController');
const {isLoggedIn} = require('../middlewares/isLoggedIn');



router.get('/profile', isLoggedIn, async (req, res)=>{
    try{
        let user = await userSchema.findOne({email: req.user.email}).populate('cart');
        let success = req.flash('success');
        let flash = req.flash('error');
        res.render('profile', {user, success, flash});
    }catch{
        req.flash('error', 'Failed to load user profile!');
        res.redirect('/shop');
    }
})

router.get('/cart', isLoggedIn, async (req, res)=>{
    try{
        let user = await userSchema.findOne({email: req.user.email}).populate('cart');

        let total = user.cart.reduce((total, item)=>{
            return total + (item.price);
        }, 0);

        let discount = user.cart.reduce((total, item)=>{
            return total + (item.discount);
        }, 0);

        let net = (total-discount) + 20;

        let success = req.flash('success');
        let flash = req.flash('error');
        res.render('cart', {user, cart : user.cart, success, flash, total, discount, net});
    }catch{
        req.flash('error', 'Failed to load cart!');
        res.redirect('/shop');
    }
});

router.get('/cart/add/:product_id', isLoggedIn, async (req, res)=>{
    try{
        let user = await userSchema.findOne({email: req.user.email});
        user.cart.push(req.params.product_id);
        user.save();
        req.flash('success', 'Product added to cart successfully!');
        res.redirect('/shop');
    }catch{
        req.flash('error', 'Failed to add product to cart!');
        res.redirect('/shop');
    }
});

router.get('/cart/remove/:product_id', isLoggedIn, async (req, res)=>{
    try{
        let user = await userSchema.findOneAndUpdate({email: req.user.email}, {$pull: {cart: req.params.product_id}});
        req.flash('success', 'Product removed from cart successfully!');
        res.redirect('/users/cart');
    }catch{
        req.flash('error', 'Failed to remove product from cart!');
        res.redirect('/users/cart');
    }
});

router.post('/register', userRegister);

router.post('/login', userLogin);

module.exports = router;