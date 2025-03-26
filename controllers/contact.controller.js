const ContactDetails = require("../models/contact.model");

const getContacts = async (req, res) => {
    try {
        const contacts = await ContactDetails.find({}).lean(); // Optimized with .lean()
        res.status(200).json(contacts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getContact = async (req, res) => {
    try {
        const { id } = req.params;
        const contact = await ContactDetails.findById(id).lean();
        if (!contact) return res.status(404).json({ message: "Contact not found" });
        res.status(200).json(contact);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createContact = async (req, res) => {
    try {
        if (!req.body.email || !req.body.phoneNumber) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const newContact = await ContactDetails.create(req.body);
        res.status(201).json(newContact);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const editContact = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedContact = await ContactDetails.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedContact) {
            return res.status(404).json({ message: "Contact not found" });
        }

        res.status(200).json(updatedContact);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteContact = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedContact = await ContactDetails.findByIdAndDelete(id);

        if (!deletedContact) {
            return res.status(404).json({ message: "Contact not found" });
        }

        res.status(200).json({ message: "Contact Deleted Successfully!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getContacts, getContact, createContact, editContact, deleteContact };
