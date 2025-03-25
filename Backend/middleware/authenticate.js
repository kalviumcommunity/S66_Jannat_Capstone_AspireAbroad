const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config({ path: '../config/.env' });

const authenticate = (req, res, next) => {
    const token = req.headers?.authorization?.split(" ")[1]; 
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET); 
            console.log(process.env.JWT_SECRET,token)
            if (decoded) {
                req.user = { 
                    userID: decoded.userID,
                    email: decoded.email
                };
                console.log(req.user)
                return next(); 
            } else {
                return res.status(401).json({ message: "Invalid token" });
            }
        } catch (err) {
            return res.status(401).json({ message: "Invalid or expired token" });
        }
    } else {
        return res.status(401).json({ message: "Login Please" });
    }
}

module.exports = authenticate;
