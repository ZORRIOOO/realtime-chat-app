const router = require('express').Router();

router.get('/home', (req, res) => {
    return res.send('Домашний экран')
})

router.use('/', require('./auth'))

module.exports = router;