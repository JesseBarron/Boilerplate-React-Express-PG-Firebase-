const db = require('./db')

//Without this the model definitions won't actually be defined in the databae
require('./models')

module.exports = db
