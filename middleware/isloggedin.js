const jwt = require("jsonwebtoken");
const usermodel = require("../models/user");

module.exports.isloggedin =async (req, res,next)=> {
  // console.log(req.cookies);

  try {
    if (!req.cookies.token) {
      return res.send("unauthorized");
    }
    let decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY);
    // console.log(decoded);
    
    let user = await usermodel
      .findOne({ email: decoded.email })
      .select("-password");
    req.user = user;
    if(user){
        return next();
    }
    
  } catch (error) {
    req.flash("error", "something went wrong");
    res.redirect("/");
  }
};
