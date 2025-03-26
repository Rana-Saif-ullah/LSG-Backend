const mongoose = require("mongoose");

const ContactSchema = mongoose.Schema(
    {
        fullName: { // Fixed typo "fulName" → "fullName"
            type: String,
            required: [true, "Please enter full name"],
            trim: true
        },
        phoneNumber: {
            type: String,
            required: [true, "Please enter phone number"],
            validate: {
                validator: function (v) {
                    return /\d{10,}/.test(v);
                },
                message: (props) => `${props.value} is not a valid phone number!`
            }
        },
        email: {
            type: String,
            required: [true, "Please enter email address"],
            trim: true,
            lowercase: true,
            validate: {
                validator: function (v) {
                    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
                },
                message: (props) => `${props.value} is not a valid email address!`
            }
        },
        address: { type: String, required: [true, "Please enter address"], trim: true },
        jobTitle: { type: String, required: [true, "Please enter job title"], trim: true },
        services: { type: String, required: [true, "Please enter services"], trim: true },
        message: { type: String, required: [true, "Please enter message"], trim: true }
    },
    { timestamps: true }
);

const ContactDetails = mongoose.model("Contact", ContactSchema);
module.exports = ContactDetails;
