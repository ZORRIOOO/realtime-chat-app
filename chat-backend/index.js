const express = require('express')
const config = require('./config/app')
const app = express()

app.get('/home', (req, res) => {
    return res.send('Домашний экран')
})

app.get('/login', (req, res) => {
    return res.send('Входной экран')
})

const port = config.appPort

app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
})

console.log('!');