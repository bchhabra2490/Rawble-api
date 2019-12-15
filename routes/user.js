import express from 'express';
var router = express.Router();

router.get('/', (req, res)=>{
    res.status(500).json({message: "Hello world from User"})
})

module.exports = router;