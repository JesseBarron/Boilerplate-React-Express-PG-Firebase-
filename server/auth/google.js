const router = require('express').Router()
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy

module.exports = router

if (!process.env.GOOGLE_ID || !process.env.GOOGLE_SECRET) {
    router.use((req, res, next) => {
      const err = new Error('We Currently Do Not Support Google Login')
      next(err)
    })
} else {
  const googleConfig = {
    clientID: process.env.GOOGLE_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK
  }
  passport.use(new GoogleStrategy(googleConfig, (accessTkn, refreshTkn, profile, done) => {
    console.log(profile)
    return done(null, profile)
  }))

  router.get('/', passport.authenticate('goolge', {
    scope: ['email']
  }))

  router.get('/callback', passport.authenticate('google'), {
    successRedirect: '/home',
    failureRedirect: '/login'
  })
}
