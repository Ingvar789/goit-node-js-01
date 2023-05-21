const { Command } = require("commander");
const contacts = require("./contacts");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      try {
        const allContacts = await contacts.listContacts();
        return console.table(allContacts);
      } catch (error) {
        console.log(error);
      }

    case "get":
      try {
        const contactToFind = await contacts.getContactById(id);
        return console.log(contactToFind);
      } catch (error) {
        console.log(error);
      }

    case "add":
      try {
        const newContact = await contacts.addContact(name, email, phone);
        return console.log(newContact);
      } catch (error) {
        console.log(error);
      }

    case "remove":
      try {
        const contactToRemove = await contacts.removeContact(id);
        return console.log(contactToRemove);
      } catch (error) {
        console.log(error);
      }

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
