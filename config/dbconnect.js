const mongoose = require('mongoose'); 
const config = require("config") ; 

const dbgr = require('debug')('development:mongoose') ; 

mongoose
.connect(`${config.get("MONGODB_URI")}/snatch`)
.then(() => {
    dbgr("db connected");    
}).catch((err) => {
    console.log(err.message);
});

module.exports = mongoose.connection ; 