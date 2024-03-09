// Required Package Import;
import mongoose from "mongoose";
const { Schema } = mongoose;

// Define Key Names;
const categories = new Schema({
    list: {
        type: Array,
        required: false
    },
}, { timestamps: true });

// Mention Table Name;
const Admin = mongoose.model('categories', categories);


// Export Admin Model;
export default Admin;