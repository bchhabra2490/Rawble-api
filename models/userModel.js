import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const UserModel = mongoose.model('User', new Schema({ 
    name: String,
    email: {type: String,lowercase: true , index : { unique: true }},
    password: { type: String, required:true , select:true },
    company: { type: String, required:true },
    phoneNumber: { type: String, required:true },
    otp: String,
    isVerified: Boolean,
    isActive: Boolean,
    address: String,
    level: {
        type: Number,
        enum :[0,1],
        default: 1
    },
    id: String
}));

export default UserModel;