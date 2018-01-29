const router = require('express').Router()
module.exports = router


router.use('/facebook', require('./facebook'))
router.use('/google', require('./google'))
router.use('/twitter', require('./twitter'))
router.use('/instagram', require('./instagram'))
