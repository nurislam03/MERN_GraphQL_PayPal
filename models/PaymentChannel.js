const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const PaymentChannelSchema = new Schema({
    sandbox: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = PaymentChannel = mongoose.model('paymentchannel', PaymentChannelSchema);