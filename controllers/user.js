const login = (req, res)=>{
    // User Login
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