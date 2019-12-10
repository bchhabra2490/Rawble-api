import mongoose from 'mongoose';

const MaterialModel = mongoose.model('Material', new Schema({ 
    name: String,
    category: String,
    id: String
}));

module.exports = MaterialModel;