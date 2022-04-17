const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/User')
const config = require('config')

const router = express.Router()

// Создание нового пользователя (регистрация)
router.post('/create-new', async (req, res) => {
    try {
        // Есть ли уже такой пользователь
        const candidate = await User.findOne({ email: req.body.email })
        if (candidate) {
            res.status(400).json({ message: 'Такой пользователь уже существует!' })
            console.log('Такой пользователь уже существует')
            return
        }

        const hashedPassword = bcrypt.hashSync(req.body.password, 10)
        const user = await new User({ password: hashedPassword, email: req.body.email, name: req.body.name })

        await user
            .save()
            .then((userInfo) => {
                // Сразу после регистрации (сохранения пользователя) входим в систему
                // Для этого в ответе отправим токен для дальнейшей аутентификации
                jwt.sign({ id: userInfo._id, email: userInfo.email }, config.get('JWTSECRET'), (err, token) => {
                    if (err) {
                        res.status(500).json('Ошибка при генерации токена', err.message)
                        console.log('Ошибка при генерации токена', err.message)
                    } else {
                        res.cookie('token', token).json({
                            id: userInfo._id,
                            email: userInfo.email,
                        })
                        res.status(201).json({ message: 'Пользователь успешно создан' })
                        console.log({ message: 'Пользователь успешно создан' })
                    }
                })
            })
            .catch((err) => {
                res.status(400).json(err.message)
                console.log('Ошибка при регистрации =>>', err.message)
            })
    } catch (e) {
        res.status(500).json('Что-то пошло не так, попробуйте снова через пару минут', e.message)
        console.log('Что-то пошло не так, попробуйте снова через пару минут', e.message)
    }
})

// Проверяем на стороне сервера есть ли в куках токен.
// Если есть, значит, пользователь авторизован
router.get('/', async (req, res) => {
    try {
        if (req.cookies.token) {
            const payload = jwt.verify(req.cookies.token, config.get('JWTSECRET'))

            // Ищем пользователя в БД по id зашитому в токен
            await User.findById(payload.id).then((userInfo) => {
                res.json(userInfo)
            })
        } else {
            res.json('Пользователь не авторизован')
        }
    } catch (e) {
        res.status(500).json('Что-то пошло не так...', e.message)
    }
})

// Удаляем токен в куках
router.post('/logout', (req, res) => {
    try {
        res.cookie('token', '').send()
    } catch (e) {
        res.status(500).json('Что-то пошло не так...', e.message)
    }
})

// Авторизация
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body

        // Ищем пользователя по email (Аутентификация)
        const user = await User.findOne({ email })
        if (!user) {
            res.status(401).json({ message: 'Неверный логин или пароль' })
            console.log('Неверный логин - такого пользователя не существует')
            return
        }

        // Если такой пользователь есть и пароль верный - подписываем токен и отдаём его
        const passOk = bcrypt.compareSync(password, user.password)
        if (passOk) {
            // Верный пароль
            jwt.sign({ id: user._id, email }, config.get('JWTSECRET'), (error, token) => {
                if (error) {
                    res.status(401).json({ message: 'Произошла какая-то ошибка' })
                    console.log('Произошла ошибка при формировании токена')
                } else {
                    res.cookie('token', token).json({
                        id: user._id,
                        email: user.email,
                        name: user.name,
                    })
                }
            })
        } else {
            // Неверный пароль
            res.status(401).json({ message: 'Неверный логин или пароль' })
            console.log('Неверный пароль!')
        }
    } catch (e) {
        res.status(500).json(e.message)
        console.log(e)
    }
})

module.exports = router
