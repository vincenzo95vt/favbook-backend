const jwt = require("jsonwebtoken");

const verifyToken = (req,res,next) => {
    //Aqui ponemos para que nos pasen por el header el token con el titulo "auth-token"
    const token = req.header("auth-token");
    //Con este if decimos que si no se encuentra el token tiene le acceso denegado
    if(!token) return res.status(401).send("Access denied");
    try {
        //Usamos jsonwebtoken para verificar el token que le hemos pasado por el header con el que tenemos guardado
        const payload = jwt.verify(token, process.env.TOKEN_SECRET);
        //Igualamos la request de payload a payload y decimos que pase a la siguiente orden
        req.payload = payload;
        next();
    } catch (error) {
        //Hacemos lo mismo que arriba pero verificando el token de refresco
        try {
            const payload = jwt.verify(token, process.env.TOKEN_SECRET_REFRESH);
            req.payload = payload;
            next();
        } catch (error) {
            res.status(400).send("Expired token");
        }
    }
};


module.exports = verifyToken;