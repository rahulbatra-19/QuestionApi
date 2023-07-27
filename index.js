const express = require('express');
const app = express();
const port = 8000;

const db = require('./config/mongoose');


app.use(express.urlencoded({ extended: true }));
// use express routes
app.use('/', require('./routes'));    // by default it fecthes routes/index.js
app.listen(port, function (err) {
    if (err) {
        console.log('Error is running the server', err);
    }
    console.log('yup! my express server is running on port', port);
});