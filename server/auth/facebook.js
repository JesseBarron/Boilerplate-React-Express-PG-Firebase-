const router = require('express').Router()
const passport = require('passport')
const FacebookStragegy = require('passport-facebook').Strategy
module.exports = router


if (!process.env.FACEBOOK_ID && !process.env.FACEBOOK_SECRET) {
  router.use((req, res, next) => {
    const err = new Error('We Currently Do Not Support Facebook Login')
    next(err)
  })
} else {
  const facebookConfigure = {
    clientID: process.env.FACEBOOK_ID,
    clientSecret: process.env.FACEBOOK_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK
  }

  passport.use(new FacebookStragegy(facebookConfigure, (accessTkn, refreshTkn, profile, done) => {
    console.log(profile, 'profile facebook')

    return done(null, profile)
  }))

  router.get('/', passport.authenticate('facebook', {
    scope: ['email', 'public_profile']
  }))

  router.get('/callback', passport.authenticate('facebook', { failureRedirect: '/login' }), (req, res, next) => {
    res.redirect('/')
  })

}
