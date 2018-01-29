const router = require('express').Router()

module.exports = router

if (!process.env.INSTAGRAM_ID || !process.env.INSTAGRAM_SECRET) {
    router.use((req, res, next) => {
      const err = new Error('We Currently Do Not Support Instagram Login')
      next(err)
    })
}

router.get('/', (req, res, next) => {
  res.send(`You've got instagram login`)
})
