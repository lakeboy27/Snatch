const mongoose = require('mongoose') ;  

const userSchema = mongoose.Schema({
    fullname : String ,
    password : String , 
    email : String ,
    cart : [ { 
        type : mongoose.Schema.Types.ObjectId ,
        ref : 'product'
    }], 
    orders : [] , 
    contact : Number , 
    picture : String 
})

module.exports = mongoose.model("user" , userSchema ) ; 