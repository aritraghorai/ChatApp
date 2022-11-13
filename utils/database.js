const { Sequelize } = require('sequelize')
const { dbConfig } = require('../config/appConfig')

const sequelize = new Sequelize(dbConfig.development)

module.exports = sequelize
