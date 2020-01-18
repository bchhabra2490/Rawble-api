import statusCode from '../helpers/statusCode';
import sendSms from '../helpers/sendSms';
import getToken from '../helpers/getToken';
import UserModel from '../models/userModel';

const login = (req, res)=>{
    // User Login
    const email = req.body.email;
    const password = req.body.password;

    UserModel.findOne({email: email, password: password})
    .then((data)=>{
        if(!data){
            res.status(statusCode.notFound.code).json(statusCode.notFound.reason);
        }
        else{
            const payload = {
                'email': data.email
            }
            const token = getToken(payload);
            statusCode.success.reason['token'] = token;
            res.status(statusCode.success.code).json(statusCode.success.reason);
        }
    })
    .catch(error=>{
        console.log("Error in Creating material ", error);
        statusCode.serverFailure.reason['error'] = error;
        res.status(statusCode.serverFailure.code).json(statusCode.serverFailure.reason);
    })
}

const createUser = (req, res)=>{
    // Create a new User
    // Send OTP for verification

    const user = new UserModel({
        id: '',
        name: req.body.name,
        phoneNumber: req.body.phoneNumber,
        company: req.body.company,
        email: req.body.email,
        password: req.body.password,
        address: req.body.address,
        isVerified: false,
        isActive: true,
        username: req.body.username,
        level: 0 // 0 -> Normal User, 1 -> Admin rights
    })

    if(sendSms.isPhoneNumberValid(user.phoneNumber)){
        const otp = Math.floor(1000 + Math.random() * 9000)
        /// Generate OTP
        user.otp = otp;
        try{
            sendSms.sendOTP(otp, user.phoneNumber, user.company);
        }catch(error){
            console.log("Cannot send OTP", error);
        }
    }else{
        // Phone Number not valid
        statusCode.serverFailure.reason['message'] = 'Phone number not valid';
        res.status(statusCode.serverFailure.code).json(statusCode.serverFailure.reason);
    }

    user.save()
    .then(data=>{
        if(!data){
            console.log("Error in user creation ");
            res.status(statusCode.serverFailure.code).json(statusCode.serverFailure.reason);
        }else{
            res.status(statusCode.success.code).json(statusCode.success.reason);
        }
        
    })
    .catch(error=>{
        console.log("Error in user creation ", error);
        statusCode.serverFailure.reason['error'] = error;
        res.status(statusCode.serverFailure.code).json(statusCode.serverFailure.reason);
    })
}

const verifyUser = (req, res)=>{
    // Verify User by matching the OTP
    otp = req.otp;
    email = req.decoded.email;
    UserModel.findOne({email: email})
    .then((err, data)=>{
        if(err){
            console.log("Error", err);
            statusCode.serverFailure.reason["error"] = err;
            res.status(statusCode.serverFailure.code).json(statusCode.serverFailure.reason);
        }else if(!data){
            res.status(statusCode.notFound.code).json(statusCode.notFound.reason);
        }else if(!data.isVerified){
            if(otp === data.otp){
                data.isVerified = true
                data.save()
                res.status(statusCode.success.code).json(statusCode.success.reason);
            }else{
                statusCode.serverFailure.reason['message'] = 'OTP does not match';
                res.status(statusCode.serverFailure.code).json(statusCode.serverFailure.reason);
            }
        }else{
            statusCode.success.reason["message"] = "User is already verified";
            res.status(statusCode.success.code).json(statusCode.success.reason);
        }
    })
    .catch(error=>{
        console.log("Error", error);
        statusCode.serverFailure.reason["error"] = error;
        res.status(statusCode.serverFailure.code).json(statusCode.serverFailure.reason);
    })
}

const resendOTP = (req, res)=>{
    const email = req.decoded.email;
    UserModel.findOne({email: email})
    .then((err, data)=>{
        if(err){
            console.log("Error", err);
            statusCode.serverFailure.reason["error"] = err;
            res.status(statusCode.serverFailure.code).json(statusCode.serverFailure.reason);
        }else if(!data){
            res.status(statusCode.notFound.code).json(statusCode.notFound.reason);
        }else{
            const otp = '';
            try{
                sendOTP(otp, data.phoneNumber, data.company);
                data.otp = otp;
                data.save()
            }catch(error){
                console.log("Cannot send OTP", error);
            }
        }
    })
    .catch(error=>{
        console.log("Error", error);
        statusCode.serverFailure.reason["error"] = error;
        res.status(statusCode.serverFailure.code).json(statusCode.serverFailure.reason);
    })
}

export default {
    login: login,
    createUser: createUser,
    verifyUser: verifyUser,
    resendOTP: resendOTP,
};