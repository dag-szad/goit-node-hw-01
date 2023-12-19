const fs = require('fs').promises;
const path = require('path');

const contactsPath = path.join(__dirname, 'db', 'contacts.json');
const data = fs.readFile(contactsPath, 'utf-8');
const contacts = JSON.parse(data);

function listContacts() {
  try {
    if (contacts.length === 0) {
      console.log('No contacts found.');
    } else {
      console.table(contacts);
    }
  } catch (err) {
    console.log("Read contacts error:", err.message);
  }
}
  
function getContactById(contactId) {
  try {
    const id = contactId;

    const contact = contacts.find(contact => contact.id === id)

    if (!contact) {
      console.log('No contacts with this id.');
    } else {
      console.table([contact]);
    }
  } catch (err) {
    console.log("Id error:", err.message);
  }
}
  
function removeContact(contactId) {
  // ...twój kod
}

function addContact(name, email, phone) {
  try {
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