import statusCode from '../helpers/statusCode';
const fs   = require('fs');
const publicKEY  = fs.readFileSync('./public.key', 'utf8');
const privateKEY  = fs.readFileSync('./private.key', 'utf8');

const i  = 'Rawble';          // Issuer 
const a  = 'https://rawble.com'; // Audience

const verifyOptions = {
    issuer:  i,
    audience:  a,
    subject: s,
    expiresIn:  "2d",
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