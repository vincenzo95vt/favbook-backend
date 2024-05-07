const jwt = require("jsonwebtoken");
const User = require("../models/profileUserSchema")
const generateToken = (payload, isRefresh) =>{
 if(isRefresh){
    return jwt.sign(payload, process.env.TOKEN_SECRET_REFRESH,{
        expiresIn: "50min",
    });
 }
 return jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: "15min"});
};

const userExist = async (email) =>{
    const user = await User.findOne({email: email}) 
    if(user) return true    
}
module.exports = {generateToken, userExist}