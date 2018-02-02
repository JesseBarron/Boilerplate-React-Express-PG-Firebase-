const router = require('express').Router()
const User = require('../db/postgres/models')
module.exports = router

router.get('/me', (req, res, next) => {
    const id = req.user
        ? req.user.id
        : null
    res.json({id})
})

router.post('/logout', (req, res, next) => {
    req.logout()
    res.sendStatus(200)
})
router.post('/login', (req, res, next) => {
    res.send('login method reached')
})

router.post('/signup', (req, res, next) => {
    res.send('signup method reached')
})


router.use('/facebook', require('./facebook'))
router.use('/google', require('./google'))
router.use('/twitter', require('./twitter'))
router.use('/instagram', require('./instagram'))
