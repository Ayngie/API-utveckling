const { Sequelize } = require('sequelize')
const path = require('path')

const sequelize = new Sequelize('presidentsDb', '', '', {
  dialect: 'sqlite',
  storage: path.join(__dirname, 'presidentsDb.sqlite'),
})

module.exports = {
  sequelize,
}
