/* eslint-disable quotes */
const User = require('../../models/user')
const { UserInputError } = require('apollo-server')
const { Op } = require('sequelize')
const { AuthenticationError } = require('apollo-server')
const messageValidator = require('../../validators/message.validator')
const MessageModel = require('../../models/message.model')

const message_resolvers = {
    Query: {
        getMessages: async (root, args, { user }) => {
            try {
                if (!user) {
                    throw new AuthenticationError('UnAuthorized')
                }
                const { from } = args
                const recipient = await User.findOne({
                    where: { username: { [Op.eq]: from } }
                })
                if (!recipient) {
                    throw new UserInputError('User does not exist')
                }
                const usernames = [recipient.username, user.username]
                const messages = await MessageModel.findAll({
                    where: {
                        from: { [Op.in]: usernames },
                        to: { [Op.in]: usernames }
                    },
                    order: [['createdAt', 'DESC']]
                })
                return messages
            } catch (err) {
                console.log(err)
            }
        }
    },
    Mutation: {
        sendMessage: async (root, args, { user }) => {
            try {
                if (!user) {
                    throw new AuthenticationError('UnAuthonticate')
                }
                //*Check data correct
                const data = await messageValidator.parseAsync(args)
                //*Check sent user is exist or not
                const recipient = await User.findOne({
                    where: { username: { [Op.eq]: data.to } }
                })
                if (!recipient) {
                    throw new UserInputError('User not Exist')
                } else if (recipient.username === user.username) {
                    throw new UserInputError(
                        "Recipient and username can't be same"
                    )
                }
                const newMessage = await MessageModel.create({
                    from: user.username,
                    to: recipient.username,
                    content: data.content
                })
                console.log(newMessage)
                return newMessage
            } catch (error) {
                console.log(error)
            }
        }
    }
}

module.exports = message_resolvers
