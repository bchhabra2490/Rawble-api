import statusCode from '../helpers/statusCode';

var privateKEY  = fs.readFileSync('./private.key', 'utf8');
var signOptions = {
    issuer:  i,
    subject:  s,
    audience:  a,
    expiresIn:  "12h",
    algorithm:  "RS256"   // RSASSA [ "RS256", "RS384", "RS512" ]
};
const login = (req, res)=>{
    // User Login
    var token = jwt.sign(payload, privateKEY, signOptions);
}

const createUser = (req, res)=>{
    // Create a new User
    // Send OTP for verification
}

const verifyUser = (req, res)=>{
    // Verify User by matching the OTP
}

function sendOTP(phoneNumber) {
    // send OTP
    // return the sent OTP
}

exports.module = {
    login: login,
    createUser: createUser,
    verifyUser: verifyUser
};