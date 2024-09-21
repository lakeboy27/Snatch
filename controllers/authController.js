const usermodel = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken') ; 
const { generateToken } = require('../utils/generateToken')
 

module.exports.registerUser = async  function(req , res)  { 
    try {
       let { email , password , fullname } = req.body  ; 


       let user = await usermodel.findOne({email : email }) ;
       if(user ) return res.status(401).send("you already have acconut plz login")

        bcrypt.genSalt(10 , function(err , salt ) { 
            bcrypt.hash( password ,salt  ,async function (err , hash ){
                if (err) return res.send(err.message) ;
                else{
                    
                    let user = await usermodel.create({
                        email , 
                        password : hash,
                        fullname 
                    })
                    let token = generateToken(user) ; 
                    res.cookie("token" , token)
                    res.send("user create successfully ") ;

                }
                })
        })

    } catch (error) {
        res.send(error.message);
    }
}

module.exports.loginUser = async function (req , res ) { 
    let { email , password } = req.body ; 
    const user =await usermodel.findOne({email : email }) ;
    if(!user ) return res.send("Email and password incorrect")
    bcrypt.compare(password , user.password, function (err , result ) { 
        if( result) {
            let token = generateToken(user) ;
            res.cookie("token" , token)
            res.redirect('/shop')
        }
        else { 
            return res.send("Email and password incorrect")
        }
    } ) 
}

module.exports.logout = function (req , res ) { 
    res.cookie( "token" , "") ; 
    res.redirect("/")
}