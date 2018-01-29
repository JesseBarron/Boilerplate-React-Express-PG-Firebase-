const router = require('express').Router()
const passport = require('passport')
const TwitterStrategy = require('passport-twitter')
module.exports = router


if (!process.env.TWITTER_ID || !process.env.TWITTER_SECRET) {
    router.use((req, res, next) => {
      const err = new Error('We Currently Do Not Support Twitter Login')
      next(err)
    })
} else {
  const twitterConfig = {
    consumerKey: process.env.TWITTER_ID,
    consumerSecret: process.env.TWITTER_SECRET,
    callbackURL: process.env.TWITTER_CALLBACK
  }

  passport.use(new TwitterStrategy(twitterConfig, (accessTkn, refreshTkn, profile, done) => {
    console.log(profile);
    return done(null, profile)
  }))

  router.get('/', passport.authenticate('twitter'))

  router.get('/callback', passport.authenticate('twitter', {
    successRedirect: '/',
    failureRedirect: '/login'
  }))

}
