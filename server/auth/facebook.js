
const router = require('express').Router()
const passport = require('passport')
const FacebookStragegy = require('passport-facebook').Strategy
const { User } = require('../db/postgres/models')
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
    callbackURL: process.env.FACEBOOK_CALLBACK,
    profileFields: [ 'email', 'displayName', 'id' ]
  }

  const strategy = new FacebookStragegy(facebookConfigure,
    async (accessTkn, refreshTkn, profile, done) => {
      try {
        const { id: facebookID, email } = profile._json
        const foundUser = await User.find({ where: { $or: [{facebookID}, {email}] }})
                       || await User.create({ facebookID, email })
        !foundUser.facebookID ? await foundUser.update({ facebookID }) : console.log('done')
        done(null, foundUser)
      } catch (error) {
        console.log(error)
        done(error)
      }
  })

  passport.use(strategy)

  router.get('/', passport.authenticate('facebook'))

  router.get('/callback', passport.authenticate('facebook', {
    failureRedirect: '/login',
    successRedirect: '/draganddrop'
  }))

}
