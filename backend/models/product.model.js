import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    priceBeforeDiscount: {
        type: Number,
        default: 0 // Assuming priceBeforeDiscount is optional
    },
    pricePerQuantity: {
        type: Number,
        default: 0 // Assuming pricePerQuantity is optional
    },
    description: {
        type: String,
        required: true
    },
    aisleNum: {
        type: String, // Using String in case of alphanumeric aisle numbers
        default: "Unknown"
    },
    packingType: {
        type: String,
        enum: ["PrePacked", "ToBePrepared"],
        required: true
    },
    packingTimeInMinutes: {
        type: Number,
        required: true
    },
    measuringUnit: {
        type: String,
        enum: ["Ct", "Lb", "Oz", "Gallon", "Kg", "L"], // Extend as needed
        default: "Ct"
    },
    nutritionPer100Gm: {
        type: String, // Assuming nutritional info is stored as a string
        default: "N/A"
    },
    availableStock: {
        type: Number,
        default: 0
    },
    maxPerOrder: {
        type: Number,
        default: 1
    },
    packingOptions: {
        type: [String], // Array of strings for various packing options
        default: []
    },
    orderedQuantity: {
        type: Number,
        default: 0
    },
    ratings: {
        type: Number, // Assuming average rating as a number
        min: 0,
        max: 5,
        default: 0
    },
    customerComments: {
        type: [String], // Array of customer comments
        default: []
    },
}, {
    timestamps: true
});

const Product = mongoose.model('Product', productSchema);

export default Product;
