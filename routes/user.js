import express from 'express';
var router = express.Router();

import userController from '../controllers/user';

router.get('/', (req, res)=>{
    res.status(500).json({message: "Hello world from User"})
})

router.post('/login', (req, res)=>{
    userController.login(req, res);
})

router.post('/signup', (req, res)=>{
    userController.createUser(req, res);
})

router.post('/verify', (req, res)=>{
    userController.verifyUser(req, res);
})

router.post('/resendotp', (req, res)=>{
    userController.resendOTP(req, res);
})

module.exports = router;