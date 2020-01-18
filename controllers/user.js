import statusCode from '../helpers/statusCode';
import { sendOTP, isPhoneNumberValid } from '../helpers/sendSms';
import getToken from '../helpers/getToken';
import UserModel from '../models/userModel';

const login = (req, res)=>{
    // User Login
    const email = req.email;
    const password = req.password;

    UserModel.findOne({email: email, password: password})
    .then((err, data)=>{
        if(err || !data){
            res.status(statusCode.unauthorised.code).json(statusCode.unauthorised.reason);
        }
        else{
            payload = {
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

const createUser = async (req, res)=>{
    // Create a new User
    // Send OTP for verification


    const user = {
        id: '',
        name: req.name,
        phoneNumber: req.phoneNumber,
        company: req.company,
        email: req.email,
        password: req.password,
        address: req.address,
        isVerified: false,
        isActive: true,
        username: req.username,
        level: 0 // 0 -> Normal User, 1 -> Admin rights
    }

    if(isPhoneNumberValid(user.phoneNumber)){

        /// Generate OTP
        user.otp = otp;
        try{
            await sendOTP(otp, user.phoneNumber, organization);
        }catch(error){
            console.log("Cannot send OTP", error);
        }
    }else{
        // Phone Number not valid
        statusCode.serverFailure.reason['message'] = 'Phone number not valid';
        res.status(statusCode.serverFailure.code).json(statusCode.serverFailure.reason);
    }

    UserModel.create(user)
    .then((err, data)=>{
        if(err){
            console.log("Error in user creation ", error);
            statusCode.serverFailure.reason['error'] = error;
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
        if(err || !data){
            console.log("Error", error);
            statusCode.serverFailure.reason["error"] = error;
            res.status(statusCode.serverFailure.code).json(statusCode.serverFailure.reason);
        }
        if(!data.isVerified){
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

exports.module = {
    login: login,
    createUser: createUser,
    verifyUser: verifyUser
};