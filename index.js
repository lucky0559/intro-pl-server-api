require('./src/models/User')
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./src/routes/authRoutes');
const requireAuth = require('./src/middleware/requireAuth');
const image = require('./image.json')


const app = express();
let port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(authRoutes);


const mongoUri = 'mongodb+srv://intro-pl:123@intro-pl@cluster0.kjlec.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

mongoose.connection.on('connected', () => {
    console.log('Connected to mongo');
});

mongoose.connection.on('error', (err) => {
    console.error('Connection error to mongo', err);
});


app.get('/', requireAuth, (req, res) => {
    res.send('Hello World');
});

app.get('/image', (req, res) => {
    res.send(image);
});

app.listen(port, () => {
    console.log(`Listening to port: ${port}`)
})