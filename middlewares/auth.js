const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    // Get token from headers
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

    if (token == null) return res.sendStatus(401); // If no token, return 401 Unauthorized

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403); // If token is invalid, return 403 Forbidden

        req.user = user; // Attach user info to request object
        next(); // Continue to the next middleware or route handler
    });
};

module.exports = authenticateToken;
