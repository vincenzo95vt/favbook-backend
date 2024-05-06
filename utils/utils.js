const jwt = require("jsonwebtoken");

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
module.exports = {generateToken}