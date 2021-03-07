const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.join(__dirname + "/db/contacts.json");

function listContacts() {
    fs.readFile(contactsPath)
        .then(contacts => console.log(JSON.parse(contacts)))
        .catch(error => console.log(error.message));
}

function getContactById(contactId) {
    fs.readFile(contactsPath)
        .then(contacts => JSON.parse(contacts))
        .then(contacts => contacts.find(contact => contact.id === contactId))
        .then(contact => console.log(contact))
        .catch(error => console.log(error.message));
}

function removeContact(contactId) {
    fs.readFile(contactsPath)
        .then(contacts => JSON.parse(contacts))
        .then(contacts => contacts.filter(contact => contact.id !== contactId))
        .then(newContacts => fs.writeFile(contactsPath, JSON.stringify(newContacts)).then(() => listContacts()))
        .catch(error => console.log(error.message));
}

function addContact(name, email, phone) {
    fs.readFile(contactsPath)
        .then(contacts => JSON.parse(contacts))
        .then(contacts =>
            fs
                .writeFile(
                    contactsPath,
                    JSON.stringify([
                        ...contacts,
                        {
                            id: contacts[contacts.length - 1].id + 1,
                            name: name,
                            email: email,
                            phone: phone,
                        },
                    ])
                )
                .then(() => listContacts())
        )
        .catch(error => console.log(error.message));
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
};
