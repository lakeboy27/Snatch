const express = require('express') ; 
const { isloggedin } = require('../middleware/isloggedin');
const router = express.Router() ; 
const productModel = require('../models/product')
const usermodel = require('../models/user')

router.get('/' , function(req , res, next ){ 
    let error = req.flash("error") ; 
    res.render("index" , {error , loggedin : false})
}) ; 

router.get("/shop", isloggedin , async (req, res,next)=>{
    let products = await productModel.find() ; 
    let success = req.flash("success") ;  
    res.render("shop" , {products , success})
})

router.get("/cart", isloggedin , async (req, res,next)=>{
    let user = await usermodel.findOne({email : req.user.email }).populate("cart") ; 
    const bill = Number(user.cart[0].price) + 20 - Number(user.cart[0].discount ); 
    res.render('cart' , { user , bill })
})

router.get("/addtocart/:productid", isloggedin , async (req, res,next)=>{
    let user = await usermodel.findOne({email : req.user.email }) ; 
    user.cart.push(req.params.productid );
    await  user.save(); 
    req.flash("success" , "added to cart ")
    res.redirect('/shop')
})

module.exports = router ; 