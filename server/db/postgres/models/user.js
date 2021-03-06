const db = require('../db')
const Sequelize = require('sequelize')
const crypto = require('crypto')


const User = db.define('user', {
  firstName: {
    type: Sequelize.STRING
  },
  lastName: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING
  },
  salt: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  twitterID: {
    type: Sequelize.STRING
  },
  facebookID: {
    type: Sequelize.STRING
  },
  googleID: {
    type: Sequelize.STRING
  },
  InstagramID: {
    type: Sequelize.STRING
  },
})

User.prototype.correctPassword = function(candidate) {
  return User.encryptPassword(candidate, this.salt) === this.password
}

User.generateSalt = function() {
  return crypto.randomBytes(16).toString('base64')
}

User.encryptPassword = function (text, salt) {
  return crypto
          .createHash('RSA-SHA256')
          .update(text)
          .update(salt)
          .digest('hex')
}

const saveSaltAndPassword = user => {
  if (user.changed('password')) {
    user.salt = User.generateSalt()
    user.password = User.encryptPassword(user.password, user.salt)
  }
}

User.beforeCreate(saveSaltAndPassword)
User.beforeUpdate(saveSaltAndPassword)

module.exports = User
