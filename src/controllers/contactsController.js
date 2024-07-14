import { fetchAllContacts, fetchContactById } from "../services/contacts.js";

export const getContacts = async (req, res) => {
  try {
    const contacts = await fetchAllContacts();
    res.status(200).json({
      status: 'success',
      message: 'Successfully found contacts!',
      data: contacts,
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch contacts',
      error: error.message,
    });
  }
};

export const getContactById = async (req, res) => {
  try {
    const { contactId } = req.params;
    const contact = await fetchContactById(contactId);
    if (contact) {
      res.status(200).json({
        status: 'success',
        message: 'Successfully found contact!',
        data: contact,
      });
    } else {
      res.status(404).json({
        status: 'error',
        message: 'Contact not found',
        data: null,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch contact',
      error: error.message,
    });
  }
};


