const Sequelize = require('sequelize')

const db = new Sequelize(process.env.PG_URL || 'postgres://localhost:5432/hairdeeziak', {
  logging: false
});

module.exports = db
