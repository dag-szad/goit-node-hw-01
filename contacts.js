const fs = require('fs').promises;
const path = require('path');

const contactsPath = path.join(__dirname, 'db', 'contacts.json');

async function loadContacts() {
  try {
    const data = await fs.readFile(contactsPath, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.log("Read contacts error:", err.message);
    return [];
  }
}

async function listContacts() {
  try {
    const contacts = await loadContacts();

    if (contacts.length === 0) {
      console.log('No contacts found.');
    } else {
      console.table(contacts);
    }
  } catch (err) {
    console.log("Read contacts error:", err.message);
  }
}
  
async function getContactById(contactId) {
  try {
    const contacts = await loadContacts();
    const id = contactId;

    const contact = contacts.find(contact => contact.id === id);

    if (!contact) {
      console.log('No contacts with this id.');
    } else {
      console.table([contact]);
    }
  } catch (err) {
    console.log("Id error:", err.message);
  }
}
  
async function removeContact(contactId) {
  try {
    const contacts = await loadContacts();
    const id = contactId;

    const contactIndex = contacts.findIndex(contact => contact.id === id);

    if (contactIndex === -1) {
      console.log('No contacts with this id.');
    } else {
      const removedContact = contacts.splice(contactIndex, 1)[0];
      console.log('Removed contact:');
      console.table([removedContact]);

      fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2), 'utf-8');
    }
  } catch (err) {
    console.log('Remove error:', err.message);
  }
}

async function addContact(name, email, phone) {
  try {
    const contacts = await loadContacts();
    const newId = contacts.length + 1;

    const newContact = {
      "id": newId,
      "name": name,
      "email": email,
      "phone": phone
    }

    const contactExists = contacts.some(contact => contact.email === email || contact.phone === phone);

    if (contactExists) {
      console.log('Contact already on the list.');
    } else {
      contacts.push(newContact);
      console.table([newContact]);

      fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2), 'utf-8');
    }
  } catch (err) {
    console.log("New contact error:", err.message);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact
}