import { gql } from 'graphql-tag'

const typeDefs = gql`
  type Query {
    users: [User]
    searchUser(value:String):[User]
  }

  type User {
    id: ID
    firstName: String
    lastName: String
    email: String
    username: String
    image: String
    bloodGroup: String
    height: Int
  }
`
export default typeDefs