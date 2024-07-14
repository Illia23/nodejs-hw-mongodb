import Contact from "../models/contacts.js";

export const fetchAllContacts = async () => {
    const contacts = await Contact.find();
    return contacts;
};

export const fetchContactById = async (contactId) => {
    const contact = await Contact.findById(contactId);
    return contact;
};
