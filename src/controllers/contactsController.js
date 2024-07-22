import { fetchAllContacts, fetchContactById, createContact as createNewContact, deleteContact, updateContact } from "../services/contacts.js";
import createError from 'http-errors';

export const getContacts = async (req, res) => {
  try {
    const contacts = await fetchAllContacts();
    if (!contacts || contacts.length === 0) {
     throw createError(404, 'Contacts not found');
    }
    res.status(200).json({
      status: 200,
      message: 'Successfully found contacts!',
      data: contacts,
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
};

export const getContactById = async (req, res) => {
    const { contactId } = req.params;
  try {
    const contact = await fetchContactById(contactId);
    if (!contact) {
      throw createError(404, 'Contact not found');
    }
    res.status(200).json({
      status: 200,
      message: `Successfully found contact with id ${contactId}!`,
      data: contact,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};

export const createContactController = async (req, res) => {
  try {
    const newContact = await createNewContact(req.body);
    res.status(201).json({
      status: 'success',
      message: 'Successfully created a contact!',
      data: newContact,
    });
  } catch (error) {
    res.status(400).json({
      status: 400,
      message: error.message,
    });
  }
};

export const updateContactController = async (req, res) => {
  const { contactId } = req.params;
  try {
    const updatedContact = await updateContact(contactId, req.body);
    if (!updatedContact) {
      throw createError(404, 'Contact not found');
    }
    res.status(200).json({
      status: 200,
      message: 'Successfully patched a contact!',
      data: updatedContact,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};

export const deleteContactController = async (req, res) => {
  const { contactId } = req.params;
  try {
    const deletedContact = await deleteContact(contactId);
    if (!deletedContact) {
      throw createError(404, 'Contact not found');
    }
    res.status(204).end();
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};



