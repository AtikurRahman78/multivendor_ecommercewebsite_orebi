const mongoose = require('mongoose');
const { Schema } = mongoose;

const subCategorySchema = new Schema({

    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    isActive: {
        type: Boolean,
        default: false,
    },
    status: {
        type: String,
        default: "pending",
        enum: ["pending", "approved", "rejected"],
    },
    categoryId: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
    },
    updated: {
        type: Date,
    },
    created: {
        type: Date,
        default: Date.now,
    }

});



module.exports = mongoose.model('SubCategory', subCategorySchema);