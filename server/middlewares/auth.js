import { verify } from 'jsonwebtoken';

export default (req, res, next) => {
    const { authorization } = req.headers;
    if(authorization) {
        const token = authorization.split(' ')[1];
        verify(token, process.env.TOKEN_KEY, {}, (err, decoded) => {
            if(err) {
                res.status(402).json({ error: err });
            } else {
                req.userId = decoded.userId;
                next();
            }
        })
    } else {
        res.send(403);
        console.log(req.headers)
    }
}