// requirements
const PORT = process.env.PORT || 3001;
const fs = require('fs');
// uuid for assigning unique id to each note to be used for deletion
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const notesDB = require('./db/db.json');


// import express
const express = require('express');
// create express instance
const app = express();

// middleware - set up express to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));


// get-request handling:
// respond with index.html when a user visits the root/home page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

// respond with notes.html when a user visits the notes page
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

// reponds with JSON string of notes database
app.get('/api/notes', (req, res) => {
    res.json(notesDB);
});

// wildcard to handle all non-specified endpoints with index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

// generate a new note object
function generateNote (title, text) {
    const newNote = {
      id: uuidv4(),
      title: title,
      text: text
    };

    notesDB.push(newNote);

    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify(notesDB, null, 2)
    );

    return newNote;
}

// handle post requests to api/notes endpoint to add a new note
app.post('/api/notes', (req, res) => {
    const newNote = generateNote(req.body.title, req.body.text);
    res.json(newNote);
});
  
// BONUS - delete existing note
function deleteNote (id) {
    // find the index of the note for a given ID
    const noteIndex = notesDB.findIndex(note => note.id === id);
  
    // if found, remove from notes array
    if (noteIndex >= 0) {
      notesDB.splice(noteIndex, 1);
  
      // write notesDB to db.json file
      fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify(notesDB, null, 2)
      );
  
      return true;
    } else {
      return false;
    }
}

// handle delete requests to api/notes/:id endpoint to delete a note
app.delete('/api/notes/:id', (req, res) => {
    const id = req.params.id;
    const deleted = deleteNote(id);
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).send();
    }
});

// listen for requests
app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);