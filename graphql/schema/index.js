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
  role: String!
  email: String!
  password: String
}
type AuthData {
  userId: ID!
  userRole: String!
  token: String!
  tokenExpiration: Int!
}
type PaymentChannel {
  _id: ID!
  user: User!
  sandbox: String!
}
input ProductInput {
  title: String!
  price: Float!
  date: String!
}
input UserInput {
  role: String!
  email: String!
  password: String!
}
input PaymentChannelInput {
  sandbox: String!
}
type RootQuery {
    products: [Product!]!
    login(email: String!, password: String!): AuthData!
    paymentChannel(userId: ID!): PaymentChannel!
}
type RootMutation {
    createProduct(productInput: ProductInput): Product
    createUser(userInput: UserInput): User
    createPaymentChannel(paymentChannelInput: PaymentChannelInput): PaymentChannel
}
schema {
    query: RootQuery
    mutation: RootMutation
}
`);