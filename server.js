// requirements
const PORT = 3001;
const fs = require('fs');
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

// wildcard to handle all non-specified endpoints with index.html
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, './public/index.html'));
// });

// respond with notes.html when a user visits the notes page
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

// reponds with JSON string of notes database
app.get('/api/notes', (req, res) => {
    res.json(notesDB);
});

// create new note

// BONUS - delete note


// listen 
app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);