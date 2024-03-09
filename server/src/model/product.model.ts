// Required Package Import;
import mongoose from "mongoose";
const { Schema } = mongoose;

// Define Key Names;
const Product = new Schema({
    id: {
        type: Number,
        required: true
    },
    categories: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    rating: {
        rate: {
            type: String,
            required: true
        },
        count: {
            type: Number,
            required: true
        }
    }
}, { timestamps: true });

// Mention Table Name;
const Admin = mongoose.model('Product', Product);


// Export Admin Model;
export default Admin;