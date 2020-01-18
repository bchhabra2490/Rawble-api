import express from 'express';
var router = express.Router();
import authController from '../controllers/auth';
import marketPlaceController from '../controllers/marketplace';

router.get('/all', authController.isAuthenticated, (req, res)=>{
    marketPlaceController.getAllMaterials(req, res);
})

router.get('/:name', authController.isAuthenticated, (req, res)=>{
    marketPlaceController.getMaterial(req, res);
});



router.post('/', authController.isAuthenticated, (req, res)=>{
    marketPlaceController.addMaterial(req, res)
})

module.exports = router;