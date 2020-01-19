import statusCode from '../helpers/statusCode';
import MaterialModel from '../models/materialModel';

const addMaterial = (req, res)=>{
    // Create a new Material
    const material = new MaterialModel({
        name: req.body.name,
        category: req.body.category,
        imageUrl: "",
        imageMeta: {},
        unit: req.body.unit,
        price: parseFloat(req.body.price)
    })

    material.save()
    .then((data)=>{
        if(!data){
            console.log("Error in Creating material ");
            res.status(statusCode.serverFailure.code).json(statusCode.serverFailure.reason);
        }else{
            // Material Created
            res.status(statusCode.success.code).json(statusCode.success.reason);
        }
        
    })
    .catch(error=>{
        console.log("Error in Creating material ", error);
        statusCode.serverFailure.reason['error'] = error;
        res.status(statusCode.serverFailure.code).json(statusCode.serverFailure.reason);
    })
}

const getMaterial = (req, res)=>{
    // Add a new material
    MaterialModel.find({name: req.params.name})
    .then(data=>{
        if(!data){
            res.status(statusCode.notFound.code).json(statusCode.notFound.reason);
        }else{
            statusCode.success.reason["data"] = data;
            res.status(statusCode.success.code).json(statusCode.success.reason);   
        }
    })
    .catch(error=>{
        console.log("Error in Getting material data ", error);
        statusCode.serverFailure.reason['error'] = error;
        res.status(statusCode.serverFailure.code).json(statusCode.serverFailure.reason);
    })
}

const getAllMaterials = (req, res)=>{
    // Get all materials
    // Params: limit
    MaterialModel.find({})
    .then((data)=>{
        if(!data){
            res.status(statusCode.notFound.code).json(statusCode.notFound.reason);
        }
        else{
            statusCode.success.reason["data"] = data;
            res.status(statusCode.success.code).json(statusCode.success.reason);
        }
        
    })
    .catch(error=>{
        console.log("Error in Getting all material data ", error);
        statusCode.serverFailure.reason['error'] = error;
        res.status(statusCode.serverFailure.code).json(statusCode.serverFailure.reason);
    })
}

export default {
    addMaterial: addMaterial,
    getMaterial: getMaterial,
    getAllMaterials: getAllMaterials
}