const userResolver = require('./user.resolver')
const messgaeResolver = require('./message.resolver')

module.exports = {
    Message: {
        createdAt: (root) => root.createdAt.toISOString()
    },
    Query: {
        ...userResolver.Query,
        ...messgaeResolver.Query
    },
    Mutation: {
        ...messgaeResolver.Mutation,
        ...userResolver.Mutation
    }
}
