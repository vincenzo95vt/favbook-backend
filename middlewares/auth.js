const jwt = require("jsonwebtoken");

const verifyToken = (req,res,next) => {
    const token = req.header("auth-token");
    if(!token) return res.status(401).send("Access denied");
    try {
        const payload = jwt.verify(token, process.env.TOKEN_SECRET);
        req.payload = payload;
        next();
    } catch (error) {
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