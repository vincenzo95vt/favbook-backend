const jwt = require("jsonwebtoken");
const Users = require("../models/profileUserSchema")
const generateToken = (payload, isRefresh) =>{
    //Con este if genereamos el token de refresco y le damos una duracion de 50 minutos
 if(isRefresh){
    return jwt.sign(payload, process.env.TOKEN_SECRET_REFRESH,{
        expiresIn: "50min",
    });
 }
 //Mientras que si no es el de refresco se le da una duracion de 15 minutos
 return jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: "15min"});
};

const userExist = async (email) =>{
    const user = await Users.findOne({email: email}) 
    return !!user;    
}
module.exports = {generateToken, userExist}