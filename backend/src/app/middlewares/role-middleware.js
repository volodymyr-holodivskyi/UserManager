const jwt = require('jsonwebtoken')

module.exports = function (roles) {
    return function (req, res, next) {
        if (req.method === "OPTIONS") {
            next()
        }
        try {
            const token = req.headers.authorization.split(' ')[1]
            if (!token) {
                return res.status(401).json({message: "User unauthorized"})
            }
            const {user} = jwt.verify(token, 'your_jwt_secret');
            let hasRole = false
            
                if (roles.includes(user.role)) {
                    hasRole = true;
                    
                }
           
            if (!hasRole) {
                return res.status(403).json({message: "You dont have permission to do that"})
            }
            next();
        } catch (e) {
            console.log(e)
            return res.status(401).json({message: "User unauthorized"})
        }
    }
};
