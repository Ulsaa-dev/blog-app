import jsonwebtoken from 'jsonwebtoken';

export default function authMiddleware(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (!token) res.status(401).json({ message: 'No token provided' });

    jsonwebtoken.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid token' });
        
        // Attach user information to the request object
        req.user = user;
        
        next();
    });
}