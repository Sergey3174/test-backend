const yargs = require("yargs");
const pkg = require("./package.json");
const {
  addNote,
  printNotes,
  deleteNote,
  editNote,
} = require("./notes.controller");

yargs.version(pkg.version);

const id = {
  type: "string",
  describe: "Note id",
  demandCommand: true,
};

const title = {
  type: "string",
  describe: "Note title",
  demandCommand: true,
};

yargs.command({
  command: "add",
  describe: "Add new note to list",
  builder: {
    title,
  },
  handler({ title }) {
    addNote(title);
  },
});

yargs.command({
  command: "list",
  describe: "Print all notes",
  async handler() {
    printNotes();
  },
});

yargs.command({
  command: "remove",
  describe: "Remove note by id",
  builder: {
    id,
  },
  handler({ id }) {
    deleteNote(id);
  },
});

yargs.command({
  command: "edit",
  describe: "Edit note by id",
  builder: {
    title,
    id,
  },
  handler({ title, id }) {
    editNote(title, id);
  },
});

yargs.parse();
