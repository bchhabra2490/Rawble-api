import statusCode from '../helpers/statusCode';
const fs   = require('fs');
const publicKEY  = fs.readFileSync('./public.key', 'utf8');

const verifyOptions = {
    issuer:  i,
    subject:  s,
    audience:  a,
    expiresIn:  "12h",
    algorithm:  ["RS256"]
};

const isAuthenticated = (req, res, next)=>{
    let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
    if (token.startsWith('Bearer ')) {
        // Remove Bearer from string
        token = token.slice(7, token.length);
    }

    if (token) {
        jwt.verify(token, publicKEY, verifyOptions,  (err, decoded) => {
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