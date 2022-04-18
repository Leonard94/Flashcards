const mongoose = require('mongoose')

const StudySchema = new mongoose.Schema({
    front: {
        type: String,
        // required: true,
    },
    back: {
        type: String,
        // required: true,
    },
    completed: {
        type: Boolean,
    },
})

const SetsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    study: [StudySchema],
})

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        requred: true,
    },
    sets: [SetsSchema],
})

const User = mongoose.model('User', UserSchema)
module.exports = User
