'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const dbConfig = require('./src/config/database.js');
const bookRouter    = require('./src/routes/book.router.js')
const mongoose = require('mongoose');

const API_PORT = 8081;
const HOST = '0.0.0.0';

const app = express();


app.use(bodyParser.json());
app.use(cors());

mongoose.Promise = global.Promise;

app.use('/books', bookRouter);

mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});


app.listen(API_PORT, HOST);

console.log(`Running on http://${HOST}:${API_PORT}`);
