import express from 'express';
var router = express.Router();
import authController from '../controllers/auth';
import marketPlaceController from '../controllers/marketplace';

router.get('/all', (req, res)=>{
    marketPlaceController.getAllMaterials(req, res);
})

router.get('/:name', (req, res)=>{
    marketPlaceController.getMaterial(req, res);
});



router.post('/', authController.isAuthenticated, (req, res)=>{
    console.log("Material")
    marketPlaceController.addMaterial(req, res)
})

module.exports = router;