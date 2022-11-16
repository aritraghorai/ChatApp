const sequelize = require('./database')
const connectDb = async () => {
    try {
        await sequelize.authenticate()
        // await sequelize.sync({ alter: true })
        // await sequelize.sync({ force: true })
        console.log('Connected')
    } catch (error) {
        console.log(error)
    }
}

module.exports = connectDb
