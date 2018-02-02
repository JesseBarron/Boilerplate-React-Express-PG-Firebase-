const db = require('./db')

//Without this the model definitions won't actually be defined in the databae
// Note this is where all the relations should be make before the export

require('./models')

module.exports = db
