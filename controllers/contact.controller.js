const ContactDetails = require("../models/contact.model");


const getContacts = async (req, res) => {
    try {
        const contact = await ContactDetails.find({});
        res.status(200).json(contact);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const getContact = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await ContactDetails.findById(id)
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const createContact = async (req, res) => {
    try {
        const product = await ContactDetails.create(req.body)
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
};

const editContact = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await ContactDetails.findByIdAndUpdate(id, req.body)

        if (!product) {
            return res.status(404).json({ message: "Contact not found" })
        }

        const updatedContact = await ContactDetails.findById(id);
        res.status(200).json(updatedContact);

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const deleteContact = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await ContactDetails.findByIdAndDelete(id)

        if (!product) {
            return res.status(404).json({ message: "Contact not found" })
        }

        res.status(200).json({ message: "Contact Deleted Successfully!" });

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = {
    getContacts,
    getContact,
    createContact,
    editContact,
    deleteContact
}