const { DataTypes } = require('sequelize')
const sequelize = require('../utils/database')

const MessageModel = sequelize.define(
    'message',
    {
        uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false
        },
        from: {
            type: DataTypes.STRING,
            allowNull: false
        },
        to: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        tableName: 'messages'
    }
)
// MessageModel.sync({ force: true })

module.exports = MessageModel
