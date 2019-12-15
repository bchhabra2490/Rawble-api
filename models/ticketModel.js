import mongoose from 'mongoose';

const TicketModel = mongoose.model('Ticket', new Schema({ 
    id: String,
    user: {type: Schema.Types.ObjectId, ref: 'User', required:true},
    materials: [{
        name: String,
        quantity: String,
        message: String,
    }],
    chats:[{
        createdAt: { type: Date, default:Date.now },
        from: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }, 
        userType: String, // 'user', 'admin'
        message: String,
        isRead: Boolean
    }]
}));

module.exports = TicketModel;