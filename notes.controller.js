const fs = require("fs/promises");
const path = require("path");
const chalk = require("chalk");

const notesPath = path.join(__dirname, "db.json");

async function addNote(title) {
  const notes = await getNotes();

  const note = {
    title,
    id: Date.now().toString(),
  };

  notes.push(note);

  await fs.writeFile(notesPath, JSON.stringify(notes));
}

async function removeNote(id) {
  const notes = await getNotes();

  const filterNotes = notes.filter(({ id: idNote }) => id !== idNote);

  await fs.writeFile(notesPath, JSON.stringify(filterNotes));
}

async function getNotes() {
  const notes = await fs.readFile(notesPath, { encoding: "utf-8" });
  return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : [];
}

async function printNotes() {
  const notes = await getNotes();

  console.log(chalk.bgBlue("Here is list notes"));

  notes.forEach(({ id, title }) => {
    console.log(chalk.blue(id, title));
  });
}

async function editNote(newTitle, id) {
  const notes = await getNotes();

  const findIndex = notes.findIndex((note) => note.id === id);

  notes[findIndex].title = newTitle;

  await fs.writeFile(notesPath, JSON.stringify(notes));
}

module.exports = {
  addNote,
  printNotes,
  removeNote,
  getNotes,
  editNote,
};
