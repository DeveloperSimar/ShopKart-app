const express = require('express');
const router = express.Router();
const productSchema = require('../modals/product-modal');
const {isLoggedIn} = require('../middlewares/isLoggedIn');



router.get('/', (req, res)=>{
    let flash = req.flash("failed");
    res.render("home", {flash});
})

router.get('/shop', isLoggedIn, async (req, res) => {

    try{
        let products = await productSchema.find();
        let success = req.flash("success");
        let flash = req.flash('error');
        return res.render("shop", {success, flash, products});
    } catch(err){
        req.flash("error", "An error occurred while fetching products.");
        return res.redirect("/");
    }

});

router.get('/shop/:filter', isLoggedIn, async (req, res) => {

    try{
        var products; 

        if(req.params.filter === 'new'){ 
            products = await productSchema.find();
            products = products.reverse();
        }
        else if(req.params.filter === 'availability'){
            products = await productSchema.find({is_avail : true});
        }
        else if(req.params.filter === 'discount'){
            products = await productSchema.find({discount:{$gt:0}});
        } 
        else if(req.params.filter === 'popular'){
            products = await productSchema.find();
        }
    
        let success = req.flash("success");
        let flash = req.flash('error');
        return res.render("shop", {products, success, flash});
    } catch(err){
        req.flash("error", "An error occurred while fetching products.");
        return res.redirect("/shop");
    }

});

router.get('/logout', (req, res) => {
    res.clearCookie("token");
    res.redirect('/');
});


module.exports = router;