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
router.put('/set/delete', async (req, res) => {
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

// Добавляем слово в набор
router.put('/set/add-new-word', async (req, res) => {
    try {
        const payload = jwt.verify(req.cookies.token, config.get('JWTSECRET'))
        const user = await User.findById(payload.id)

        // Перебираем все наборы
        user.sets.map((set) => {
            if (set.id === req.body.setId) {
                // В нужном наборе добавляем новый объект слово
                set.study.push({
                    front: req.body.front,
                    back: req.body.back,
                    completed: false,
                })
            }
            return set
        })
        await user.save().then((result) => res.send(result))
    } catch (e) {
        res.status(500).json(e.message)
        console.log(e)
    }
})

// Изменяем имя набора
router.put('/set/rename', async (req, res) => {
    try {
        const payload = jwt.verify(req.cookies.token, config.get('JWTSECRET'))
        const user = await User.findById(payload.id)

        user.sets.map((set) => {
            if (set.id === req.body.setId) {
                set.title = req.body.title
            }
            return set
        })

        await user.save()
        res.send(user)
    } catch (e) {
        res.status(500).json(e.message)
        console.log(e)
    }
})

// Изменяем имя и перевод термина
router.put('/set/term/rename', async (req, res) => {
    try {
        const payload = jwt.verify(req.cookies.token, config.get('JWTSECRET'))
        const user = await User.findById(payload.id)

        // Перебираем все наборы
        const updateUser = user.sets.map((s) => {
            // Если это нужный набор
            if (s.id === req.body.setId) {
                // перебираем слова в нужном наборе оставляем все кроме цели
                s.study.map((term) => {
                    if (term.id === req.body.termId) {
                        term.front = req.body.front
                        term.back = req.body.back
                    }
                    return term
                })
            }
            return s
        })

        user.sets = updateUser
        await user.save()
        res.send(user)
    } catch (e) {
        res.status(500).json(e.message)
        console.log(e)
    }
})

module.exports = router
