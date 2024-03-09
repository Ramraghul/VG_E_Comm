// Required Package Import;
import mongoose from "mongoose";
const { Schema } = mongoose;

// Define Key Names;
const ProductOrder = new Schema({
    orderId: {
        type: String,
        required: true
    },
    totalItem: {
        type: Number,
        required: true
    },
    totalPrice: {
        type: String,
        required: true
    },
    products: [
        {
            id: {
                type: Number,
                required: true
            },
            title: {
                type: String,
                required: true
            },
            image: {
                type: String,
                required: false
            },
            price: {
                type: String,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
            totalPrice: {
                type: Number,
                required: true
            }

        }
    ]
}, { timestamps: true });

// Mention Table Name;
const Admin = mongoose.model('ProductOrder', ProductOrder);


// Export Admin Model;
export default Admin;