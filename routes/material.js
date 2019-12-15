import express from 'express';
var router = express.Router();
import authController from '../controllers/auth';


router.get('/', authController.isAuthenticated, (req, res)=>{
    res.status(500).json({message: "Hello world from Material"})
})

module.exports = router;