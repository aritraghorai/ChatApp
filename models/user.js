'use strict'
const { DataTypes } = require('sequelize')
const sequelize = require('../utils/database')

const User = sequelize.define(
    'users',
    {
        username: {
            type: DataTypes.STRING(20),
            allowNull: false,
            unique: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        profilePic: DataTypes.STRING
    },
    {
        tableName: 'users'
    }
)

module.exports = User
