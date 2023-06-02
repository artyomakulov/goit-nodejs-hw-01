import { readFile, writeFile } from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const pathToContacts = path.join("db", "contacts.json");

export async function listContacts() {
  try {
    const readContacts = await readFile(pathToContacts);
    return JSON.parse(readContacts);
  } catch (err) {
    console.log("err", err);
  }
}

export async function getContactById(contactId) {
  try {
    const findContact = await listContacts();
    return findContact.find(({ id }) => id === contactId);
  } catch (err) {
    console.log(err);
  }
}

export async function removeContact(contactId) {
  // try {
  //   const allContacts = await listContacts();
  //   const filteredContacts = allContacts.filter(({ id }) => id !== contactId);
  //   return filteredContacts;
  // } catch (err) {
  //   console.log("err", err);
  // }
}

export async function addContact(name, email, phone) {
  try {
    const allContacts = await listContacts();
    console.log(name, email, phone);
    const newContact = {
      id: nanoid(),
      name,
      email,
      phone,
    };
    allContacts.push(newContact);
    await writeFile(pathToContacts, JSON.stringify(allContacts, null, 2));
    console.log("newContact", newContact);
  } catch (err) {
    console.log("err", err);
  }
}

