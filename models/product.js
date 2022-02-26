const { Schema, model } = require('mongoose')

const productSchema = new Schema({
    name: {
        type: String,
        required: [true, 'name must be provided'],
        trim: true,
    },
    price: {
        type: Number,
        required: [true, 'name must be provided'],
    },
    featured: {
        type: Boolean,
        default: false,
    },
    rating: {
        type: Number,
        default: 4.5,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    company: {
        type: String,
        enum: {
            values: ['ikea', 'marcos', 'liddy', 'caressa'],
            message: '{VALUE} is not supported'
        },
        // enum: ['ikea', 'marcos', 'liddy', 'caressa'],
    }
})

module.exports = model('Product', productSchema)