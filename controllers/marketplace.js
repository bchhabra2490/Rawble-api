import statusCode from '../helpers/statusCode';
import MaterialModel from '../models/materialModel';

const addMaterial = (req, res)=>{
    // Create a new Material
    const material = {
        name: req.name,
        category: req.category,
        imageUrl: "",
        imageMeta: {},
        price: parseFloat(req.price)
    }

    MaterialModel.create(material)
    .then((err, data)=>{
        if(err || !data){
            console.log("Error in Creating material ", err);
            statusCode.serverFailure.reason['error'] = err;
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
    MaterialModel.find({name: req.name})
    .then((err, data)=>{
        if(err || !data){
            console.log("Error in Getting material data ", err);
            statusCode.serverFailure.reason['error'] = err;
            res.status(statusCode.serverFailure.code).json(statusCode.serverFailure.reason);
        }
        else if(data.length>0){
            statusCode.success.reason["data"] = data;
            res.status(statusCode.success.code).json(statusCode.success.reason);
        }else{
            res.status(statusCode.notFound.code).json(statusCode.notFound.reason);
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
    .then((err, data)=>{
        if(err || !data){
            console.log("Error in Getting material data ", err);
            statusCode.serverFailure.reason['error'] = err;
            res.status(statusCode.serverFailure.code).json(statusCode.serverFailure.reason);
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

export default {
    addMaterial: addMaterial,
    getMaterial: getMaterial,
    getAllMaterials: getAllMaterials
}