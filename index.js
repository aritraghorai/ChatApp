const { ApolloServer } = require('apollo-server')
const jwt = require('jsonwebtoken')
const typeDefs = require('./Graphql/typeDefs.js')
const connectDb = require('./utils/connectDb')
const resolvers = require('./Graphql/Resolvers')
const { dbConfig, appConfig } = require('./config/appConfig')
const User = require('./models/user.js')

// A map of functions which return data for the schema.

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async (ctx) => {
        if (ctx.req.headers.authorization) {
            const token = ctx.req.headers.authorization.substring(7)
            const decode = jwt.decode(token, appConfig().JWT_SECRET)
            const user = await User.findOne({ username: decode.username })
            return {
                user: user.dataValues
            }
        }
    }
})
server.listen().then(({ url }) => {
    console.log(`Running on ${url}`)
})
connectDb(dbConfig.development)
