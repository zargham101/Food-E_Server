const mongoose = require('mongoose');

const { Schema } = mongoose;

const FoodItems = new Schema({
    CategoryName: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    option: [{
        type: String,
        required: true
    }],
    description: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('food_items', FoodItems);