const db = require('../db')
const Sequelize = require('sequelize')
const crypto = require('crypto')


const Admin = db.define('admin', {
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
  // Room For some Privileges
})

Admin.prototype.correctPassword = function(candidate) {
  return Admin.encryptPassword(candidate, this.salt) === this.password
}

Admin.generateSalt = function() {
  return crypto.randomBytes(16).toString('base64')
}

Admin.encryptPassword = function (text, salt) {
  return crypto
          .createHash('RSA-SHA256')
          .update(text)
          .update(salt)
          .digest('hex')
}

const saveSaltAndPassword = user => {
  if (user.changed('password')) {
    user.salt = Admin.generateSalt()
    user.password = Admin.encryptPassword(user.password, user.salt)
  }
}

Admin.beforeCreate(saveSaltAndPassword)
Admin.beforeUpdate(saveSaltAndPassword)

module.exports = Admin
