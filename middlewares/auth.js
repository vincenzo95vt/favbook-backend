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

const verifyAdmin = (req, res, next) => {
    try {
        const payload = req.payload
        if(!payload.role || payload.role === "user") return res.status(402).send("No estas autorizado")
        req.payload = payload;
        next()
    } catch (error) {
        res.status(400).json({
            status: "error",
            data: error.message
        })
    }
}


module.exports = {verifyToken, verifyAdmin};