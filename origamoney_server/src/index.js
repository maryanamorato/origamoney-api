require('./models/User')
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const authRoutes = require('./routes/authRoutes')
const requireAuth = require('./middlewares/requireAuth')

const app = express()

app.use(bodyParser.json());
app.use(authRoutes);

const mongoUri = 'mongodb+srv://maryana:4ZJxcZAhnilaFrUL@cluster0-6g2gd.gcp.mongodb.net/<dbname>?retryWrites=true&w=majority/'

mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

mongoose.connection.on('connected', () => {
    console.log("Connected to mongo instance")
})

mongoose.connection.on('error', (err) => {
    console.error("Error connecting to mongo ", err)
})

app.get('/', requireAuth, (req, res) => {
    res.send(`Your email: ${req.user.email}`)
})

app.listen(3008, () => {
    console.log("Listening on 3008")
})