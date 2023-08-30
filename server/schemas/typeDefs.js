const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    donations: [Donation]
  }

  type Donation {
    _id: ID!
    amount: Int!
    date: String!
    user: User
    organizationId: [Organization]
  }
 type Organization{
 _id: ID!
 name: String!
 description: String!
 amountraised: Int
 }
  type Query {
    me: User
    users: [User]
    donations: [Donation]
    organizations: [Organization]
    
  }

  type Auth {
    token: ID!
    user: User!
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    makeDonation(amount: Int!, date: String!, organizationId: ID!): Donation
    makeOrganization(name: String!, description: String!, amountraised: Int): Organization
  }
`;

module.exports = typeDefs;
