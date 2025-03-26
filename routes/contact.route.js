const express = require("express");
const router = express.Router();
const { getContacts, getContact, createContact, editContact, deleteContact } = require("../controllers/contact.controller.js");

router.get('/', getContacts);
router.get('/:id', getContact);

router.post('/', createContact);

// Update a product
router.put('/:id', editContact);

// Delete a product
router.delete('/:id', deleteContact);




module.exports = router
