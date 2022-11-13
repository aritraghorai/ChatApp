const { gql } = require("apollo-server");

const typeDefs = gql`
  type User {
    username: String!
    id: ID!
    email: String!
    token: String!
  }
  type Query {
    getUsers: [User]
    login(username: String!, password: String!): User!
  }
  type Mutation {
    register(
      username: String!
      email: String!
      password: String!
      confirmPassword: String!
    ): User!
  }
`;

module.exports = typeDefs;