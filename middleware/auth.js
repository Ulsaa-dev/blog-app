import jsonwebtoken from 'jsonwebtoken';

export default function authMiddleware(req, res, next) {
    const token = req.cookies.token;

    if (token) {
        jsonwebtoken.verify(token, process.env.JWT_SECRET, (err, user) => {
            
            if (!err) {
                req.user = user;
                res.locals.user = user;
            }
        });
    }
    
    next();
}