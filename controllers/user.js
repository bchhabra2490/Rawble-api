import statusCode from '../helpers/statusCode';

const privateKEY  = fs.readFileSync('./private.key', 'utf8');
const i  = 'Rawble';          // Issuer 
const a  = 'https://rawble.com'; // Audience


const login = (req, res)=>{
    // User Login
    
    var signOptions = {
        issuer:  i,
        audience:  a,
        subject: s,
        expiresIn:  "2d",
        algorithm:  "RS256"   // RSASSA [ "RS256", "RS384", "RS512" ]
    };
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