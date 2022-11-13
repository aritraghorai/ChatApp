import { gql } from '@apollo/client'

export const REGISTER_USER = gql`
    mutation Register(
        $username: String!
        $email: String!
        $password: String!
        $confirmPassword: String!
    ) {
        register(
            username: $username
            email: $email
            password: $password
            confirmPassword: $confirmPassword
        ) {
            email
            id
            token
            username
        }
    }
`
export const LOGIN_USER = gql`
    query Login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            email
            id
            token
            username
        }
    }
`
