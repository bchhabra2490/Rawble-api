import statusCode from '../helpers/statusCode';

const jwtSecretKey = process.env.JWT_SECRET_KEY;
const isAuthenticated = (req, res, next)=>{
    let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
    if (token.startsWith('Bearer ')) {
        // Remove Bearer from string
        token = token.slice(7, token.length);
    }

    if (token) {
        jwt.verify(token, jwtSecretKey, (err, decoded) => {
        if (err) {
            return res.status(statusCode.unauthorised.code).json(statusCode.unauthorised.reason);
        } else {
            req.decoded = decoded;
            next();
        }
        });
    } else {
        return res.status(statusCode.unauthorised.code).json(statusCode.unauthorised.reason);
    }
}

module.exports = {
    isAuthenticated: isAuthenticated
}