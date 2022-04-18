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

// Получаем определенный набор
router.get('/set/:setid', async (req, res) => {
    try {
        const payload = jwt.verify(req.cookies.token, config.get('JWTSECRET'))
        const user = await User.findById(payload.id)
        const targetSet = user.sets.filter((set) => set.id === req.params.setid)
        res.send(targetSet)
    } catch (e) {
        res.status(500).json(e.message)
        console.log(e)
    }
})

// Удаляем определённый набор
router.put('/set/delete/:setId', async (req, res) => {
    try {
        const payload = jwt.verify(req.cookies.token, config.get('JWTSECRET'))
        const user = await User.findById(payload.id)
        user.sets = user.sets.filter((set) => set.id !== req.body.setId)
        await user.save()
        res.send('Success')
    } catch (e) {
        res.status(500).json(e.message)
        console.log(e)
    }
})

module.exports = router
