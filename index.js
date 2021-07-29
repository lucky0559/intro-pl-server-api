const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


const app = express();
let port = process.env.PORT || 3000;

app.use(bodyParser.json());


const mongoUri = 'mongodb+srv://intro-pl:123@intro-pl@cluster0.kjlec.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

mongoose.connection.on('connected', () => {
    console.log('Connected to mongo');
});

mongoose.connection.on('error', (err) => {
    console.error('Connection error to mongo', err);
});


app.get('/',(res, req) => {
    res.send('Hello World');
});

app.listen(port, () => {
    console.log(`Listening to port: ${port}`)
})