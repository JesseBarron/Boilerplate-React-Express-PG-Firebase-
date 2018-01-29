const db = require('../db')
const Sequelize = require('sequelize')
const User = db.define('user', {
  firstName: {
    type: Sequelize.STRING
  },
  lastName: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  twitterId: {
    type: Sequelize.STRING
  },
  facebookId: {
    type: Sequelize.STRING
  },
  googleId: {
    type: Sequelize.STRING
  },
  InstagramId: {
    type: Sequelize.STRING
  },
})

module.exports = User
