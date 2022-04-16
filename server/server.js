const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const config = require('config')

const PORT = process.env.PORT || 5000

const app = express()

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))
app.use(bodyParser.json({ extended: true }))
app.use(cookieParser())

async function start() {
    try {
        await mongoose.connect(config.get('mongo'))
        app.listen(PORT, () => console.log(`App has been started on port: ${PORT}...`))
    } catch (error) {
        console.log('Could not connection to database', error.message)
        process.exit(1)
    }
}
start()

// Роуты
app.use('/user', require('./routes/user'))
