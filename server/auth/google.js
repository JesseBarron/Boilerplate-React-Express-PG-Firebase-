const router = require('express').Router()
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
const { User } = require('../db/postgres/models')

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

  passport.use(new GoogleStrategy(googleConfig, 
    async (accessTkn, refreshTkn, profile, done) => {
      try {
        const googleID = profile.id
        const email = profile.emails[0].value
        const foundUser = await User.find({where: { $or: [{email}, {googleID}] }}) 
                       || await User.create({googleID, email})
        foundUser.googleID ? await foundUser.update({googleID}) : console.log('done')
        return done(null, foundUser)
      } catch (error) {
        console.log(error)
        done(error)
      }
  }))

  router.get('/', passport.authenticate('google', {
    scope: ['email']
  }))

  router.get('/callback', passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/login'
  }))
}
