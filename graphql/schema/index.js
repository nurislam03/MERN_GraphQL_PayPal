const { buildSchema } = require('graphql');

module.exports = buildSchema(`
type Product {
  _id: ID!
  title: String!
  price: Float!
  date: String!
  creator: User!
}
type User {
  _id: ID!
  name: String!
  email: String!
  password: String
}
type AuthData {
  userId: ID!
  token: String!
  tokenExpiration: Int!
}
input ProductInput {
  title: String!
  price: Float!
  date: String!
}
input UserInput {
  name: String!
  email: String!
  password: String!
}
type RootQuery {
    products: [Product!]!
    login(email: String!, password: String!): AuthData!
}
type RootMutation {
    createProduct(productInput: ProductInput): Product
    createUser(userInput: UserInput): User
}
schema {
    query: RootQuery
    mutation: RootMutation
}
`);