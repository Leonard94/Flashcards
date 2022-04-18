const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/User')
const config = require('config')

const router = express.Router()

// Проверка
router.get('/test', (req, res) => {
    res.send('Good Job!')
})

// Получение всех наборов пользователя
router.get('/', async (req, res) => {
    try {
        const payload = jwt.verify(req.cookies.token, config.get('JWTSECRET'))
        const user = await User.findById(payload.id)
        res.send(user.sets)
    } catch (e) {
        res.status(500).json(e.message)
        console.log(e)
    }
})

// Создание нового набора
router.post('/new-set', async (req, res) => {
    try {
        const payload = jwt.verify(req.cookies.token, config.get('JWTSECRET'))
        const user = await User.findById(payload.id)
        user.sets.push({ title: req.body.title })

        await user.save()
        res.send(user)
    } catch (e) {
        res.status(500).json(e.message)
        console.log(e)
    }
})

module.exports = router
