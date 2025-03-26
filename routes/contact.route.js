const express = require("express");
const router = express.Router();
const {
    getContacts,
    getContact,
    createContact,
    editContact,
    deleteContact
} = require("../controllers/contact.controller.js");

router.get("/", getContacts);
router.get("/:id", getContact);
router.post("/", createContact);
router.put("/:id", editContact);
router.delete("/:id", deleteContact);

module.exports = router;
