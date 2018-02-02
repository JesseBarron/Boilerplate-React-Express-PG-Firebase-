const router = require('express').Router()
const { User } = require('../db/postgres/models')
module.exports = router

router.get('/', async (req, res, next) => {
    try {
        const users = await User.findAll()
        res.status(200).json(users)
    } catch (err) {
        next(err)
    }
})
router.post('/', async (req, res, next) => {
    try {
        const newUser = await User.create(req.body)
        res.sendStatus(201)
    } catch (error) {
        next(error)
    }
});