import mongoose from 'mongoose';
const Schema = mongoose.Schema;


const MaterialModel = mongoose.model('Material', new Schema({ 
    name: { type: String, required:true, lowercase: true },
    category: String,
    id: String,
    imageUrl: String,
    imageMeta: Object,
    price: { type: Number, required:true }
}));

export default MaterialModel;