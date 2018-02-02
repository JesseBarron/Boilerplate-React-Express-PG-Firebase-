const express = require('express')
const path = require('path')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const session = require('express-session')
const passport = require('passport')
const db = require('./db/postgres')
const SequelizeStore = require('connect-session-sequelize')(session.Store)

const sessionStore = new SequelizeStore({db})
const app = express()
const PORT = process.env.PORT || 8080

module.exports = app

if (process.env.NODE_ENV !== 'production') require('../secrets')

//Passport Registration (Must be done before the rest of the setup)
passport.serializeUser((user, done) => done(null, user.id))
passport.deserializeUser(async (userID, done) => {
  try {
    const foundUser = await db.models.user.findById(userID)
    done(null, foundUser)
  } catch (error) {
    console.log(error)
  }
})



//Creates the server
const createApp = () => {
  app.use(morgan('dev'))
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({extended: true}))

  //Session Setup (Before we initialize passport and passport.session())
  app.use(session({
    secret: process.env.SESSION_SECRET || 'Shhhhh keep this secret',
    resave: false,
    store: sessionStore,
    saveUninitialized: false
  }))

  app.use(passport.initialize())
  app.use(passport.session())

  //Routes to the authentication routes
  app.use('/auth', require('./auth'))

  //Routes to the API routes
  app.use('/api', require('./api'))
  app.use(express.static(path.join(__dirname, '..', 'public')))
  .use((req, res, next) => {
      if (path.extname(req.path).length) {
        const err = new Error('Not found')
        err.status = 404
        next(err)
      } else {
        next()
      }
    })

  app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public/index.html'))
  })

  app.use((err, req, res, next) => {
    console.log(err);
    console.log(err.stack);
    res.status(err.status || 500).send(err.message || 'Internal Server Error')
  })

}

const startListening = () => {
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  })
}

const syncDB = () => db.sync({force: false})

if (require.main === module) {
  sessionStore.sync({force: false})
  .then(syncDB)
  .then(createApp)
  .then(startListening)
} else {
  createApp()
}
