const mongoose = require('mongoose');
const { Schema } = mongoose;


const variantSchema = new Schema({

    color: {
        type: String,
    },
    image: {
        type: String,
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    storage: {
        type: String,
    },
    price: {
        type: String,
    },
    quantity: {
        type: String,
    },
    ram: {
        type: String,
    },
    size: {
        type: String,
    },
    updated: {
        type: Date,
    },
    created: {
        type: Date,
        default: Date.now,
    },

});


module.exports = mongoose.model('Variant', variantSchema);