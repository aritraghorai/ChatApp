const { gql } = require('apollo-server')

const typeDefs = gql`
    type User {
        username: String!
        id: ID!
        email: String!
        token: String!
    }
    type Message {
        uuid: ID!
        content: String!
        from: String!
        to: String!
        createdAt: String!
    }
    type Query {
        getUsers: [User]
        login(username: String!, password: String!): User!
        getMessages(from: String!): [Message]
    }
    type Mutation {
        register(
            username: String!
            email: String!
            password: String!
            confirmPassword: String!
        ): User!
        sendMessage(to: String!, content: String!): Message!
    }
`

module.exports = typeDefs
