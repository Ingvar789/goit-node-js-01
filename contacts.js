const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "./db/contacts.json");

async function listContacts() {
  const allContacts = await fs.readFile(contactsPath);
  return JSON.parse(allContacts);
}

async function getContactById(contactId) {
  const allContacts = await listContacts();
  const contactToFind = allContacts.find((item) => item.id === contactId);
  return contactToFind || null;
}

async function removeContact(contactId) {
  const allContacts = await listContacts();
  const contactToRemove = allContacts.findIndex(
    (item) => item.id === contactId
  );
  console.log(contactToRemove);
  if (contactToRemove === undefined) {
    return `Contact with id ${contactId} is not existing!`;
  }
  allContacts.splice(contactToRemove, 1);
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  return `Contact with id ${contactId} was succesfully deleted!`;
}

async function addContact(name, email, phone) {
  const allContacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name: name,
    email: email,
    phone: phone,
  };
  allContacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
