const mongoose = require("mongoose");

const contactSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add contact name"],
    },
    email: {
        type: String,
        required: [true, "please add email"],
    },
    phone: {
        type: String,
        required: [true, "please add contact phone number"],
    },
}, {
    timestamps: true,
}
);

module.exports = mongoose.model("Contact",contactSchema);