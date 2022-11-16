/* eslint-disable quotes */
const User = require('../../models/user')
const bcrypt = require('bcrypt')
const registerUserDataValidator = require('../../validators/register.user.validator')
const { UserInputError } = require('apollo-server')
const { ZodError } = require('zod')
const { UniqueConstraintError } = require('sequelize')
const jwt = require('jsonwebtoken')
const { appConfig } = require('../../config/appConfig')
const loginDataValidator = require('../../validators/logindata.validator')
const { Op } = require('sequelize')
const { AuthenticationError } = require('apollo-server')

const createToken = (payload) => {
    return jwt.sign(payload, appConfig().JWT_SECRET)
}

const user_resolvers = {
    Query: {
        // eslint-disable-next-line no-unused-vars
        getUsers: async (root, args, context) => {
            const user = context.user
            if (!user) {
                throw AuthenticationError('Un Authonticate')
            }
            const res = await User.findAll({
                where: { username: { [Op.ne]: user.username } }
            })
            return res
        },
        login: async (parent, args) => {
            try {
                //*validate user login data
                const data = await loginDataValidator.parseAsync(args)
                //*find is user is present or not
                const user = await User.findOne({
                    where: { username: data.username }
                })

                if (!user) {
                    throw new ZodError([
                        {
                            message: 'username does not exist',
                            path: ['username']
                        }
                    ])
                }
                if (!(await bcrypt.compare(data.password, user.password))) {
                    throw new ZodError([
                        {
                            message: 'password is incorrect',
                            path: ['password']
                        }
                    ])
                }

                const { username, email, id } = user.dataValues
                return {
                    username,
                    email,
                    id,
                    token: createToken({ username })
                }
            } catch (error) {
                const myError = {}
                if (error instanceof ZodError) {
                    error.issues.forEach((issue) => {
                        issue.path.forEach((pa) => {
                            myError[pa] = issue.message
                        })
                    })
                } else if (error instanceof UniqueConstraintError) {
                    Object.keys(error.fields).forEach((fi) => {
                        myError[fi] = `${fi} already exist`
                    })
                }
                throw new UserInputError('Invalid User Data', {
                    errors: myError
                })
            }
        }
    },

    Mutation: {
        register: async (parent, args) => {
            try {
                //!Validate User Input
                const data = await registerUserDataValidator.parseAsync(args)
                //!Encrypt The password
                const encryptPassword = await bcrypt.hash(
                    data.password,
                    appConfig().SALT_ROUNDS
                )
                //!Create New User
                const newUser = await User.create({
                    username: data.username,
                    email: data.email,
                    password: encryptPassword
                })
                //!Return New User
                return {
                    username: newUser.username,
                    email: newUser.email,
                    id: newUser.id,
                    token: createToken({ username: newUser.username })
                }
            } catch (error) {
                /*
             out error message willl be like 
             password:...error message,
             username:..error message
            */
                const myError = {}
                if (error instanceof ZodError) {
                    error.issues.forEach((issue) => {
                        issue.path.forEach((pa) => {
                            myError[pa] = issue.message
                        })
                    })
                } else if (error instanceof UniqueConstraintError) {
                    Object.keys(error.fields).forEach((fi) => {
                        myError[fi] = `${fi} already exist`
                    })
                }
                throw new UserInputError('Invalid User Data', {
                    errors: myError
                })
            }
        }
    }
}

module.exports = user_resolvers
