const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const User = require('./models/User')
const config = require('config')

const app = express()
app.use(
    cors({
        credentials: true,
        origin: 'http://localhost:3000',
    }),
)
app.use(bodyParser.json({ extended: true }))
app.use(cookieParser())
// app.use(express.json())

const PORT = process.env.PORT || 5000

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

app.get('/', (req, res) => {
    res.send('Hello, word')
})

app.post('/user/create-new', async (req, res) => {
    try {
        const hashedPassword = bcrypt.hashSync(req.body.password, 10)
        const user = await new User({ password: hashedPassword, email: req.body.email })

        user.save()
            .then((userInfo) => {
                console.log(userInfo)
                // Сразу после регистрации (сохранения пользователя) входим в систему
                // В ответе отправим токен для дальнейшей аутентификации
                jwt.sign({ id: userInfo._id, email: userInfo.email }, config.get('JWTSECRET'), (err, token) => {
                    if (err) {
                        res.status(500).json(err.message)
                    } else {
                        res.cookie('token', token).json({
                            id: userInfo._id,
                            email: userInfo.email,
                        })
                    }
                })
            })
            .catch((err) => {
                res.status(400).json(err.message)
                console.log('Ошибка при регистрации =>>', err.message)
            })
    } catch (e) {
        res.status(500).json(e.message)
    }
})

// Проверяем на стороне сервера есть ли в куках токен.
// Если есть, значит, пользователь авторизован
app.get('/user', (req, res) => {
    if (req.cookies.token) {
        const payload = jwt.verify(req.cookies.token, config.get('JWTSECRET'))

        // Ищем пользователя в БД по id зашитому в токен
        User.findById(payload.id).then((userInfo) => {
            res.json(userInfo)
        })
    } else {
        // console.log('Пользователь не авторизован')
    }
})

// Удаляем токен в куках
app.post('/user/logout', (req, res) => {
    res.cookie('token', '').send()
})

// Авторизация
app.post('/user/login', (req, res) => {
    const { email, password } = req.body

    // Ищем пользователя по email (Аутентификация)
    User.findOne({ email }).then((userInfo) => {
        const passOk = bcrypt.compareSync(password, userInfo.password)
        if (passOk) {
            // Если такой пользователь есть и пароль верный - подписываем новый токен и отдаём его с ответом
            jwt.sign({ id: userInfo._id, email }, config.get('JWTSECRET'), (error, token) => {
                if (error) {
                    res.status(401).json(error.message)
                    console.log('Неверный пароль')
                } else {
                    res.cookie('token', token).json({
                        id: userInfo._id,
                        email: userInfo.email,
                    })
                }
            })
        } else {
            res.sendStatus(401).json('Неверный логин или пароль')
            console.log('нет такого пользователя?')
        }
    })
})
