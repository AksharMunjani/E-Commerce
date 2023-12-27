const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({
    userId: { type: String, require: true },
    producys: [{
        productId: { type: String },
        quantity: { type: Number, default: 1 }
    }],
    address: { type: String, require: true },
    amount: { type: Number, require: true },
    status: { type: String, default: 'Pending', require: true },
}, { timestamps: true })
mongoose.models = {}
export default mongoose.model('Order', OrderSchema);