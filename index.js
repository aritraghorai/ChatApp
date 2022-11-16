const { ApolloServer } = require('apollo-server')
const typeDefs = require('./Graphql/typeDefs.js')
const connectDb = require('./utils/connectDb')
const resolvers = require('./Graphql/Resolvers')
const context_middleware = require('./utils/middleware/context_middleware.js')

// A map of functions which return data for the schema.

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: context_middleware
})
server.listen().then(({ url }) => {
    console.log(`Running on ${url}`)
})
connectDb()
