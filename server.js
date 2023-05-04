// requirements
const PORT = 3001;
const fs = require('fs');
const path = require('path');
const notesDB = require('./db/db.json');

// initialize express
const express = require('express');
const app = express();

// use express
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));





// listen 
app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);