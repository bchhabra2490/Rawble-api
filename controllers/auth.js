import statusCode from '../helpers/statusCode';

const isAuthenticated = (req, res, next)=>{
    res.status(statusCode.unauthorised.code).json(statusCode.unauthorised.reason);
    // next();
}

module.exports = {
    isAuthenticated: isAuthenticated
}