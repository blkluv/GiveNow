const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    donations: [Donation]
    topdoner: Boolean
  }

  type Donation {
    _id: ID!
    amount: Int!
    date: String!
    userId: User
    organization: Organization!
  }

  type UserDonation {
    user: User
    donationAmount: Int
  }

 type Organization{
 _id: ID!
 name: String!
 description: String!
 amountraised: Int
category: String!
image: String
 topDonors: [UserDonation]  
 }
  type Query {
    org(orgId: ID!): Organization 
    me: User
    user(userId: ID!): User
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
    makeDonation(amount: Int!, organization: ID!): Donation
    makeOrganization(name: String!, description: String!, amountraised: Int, category: String!, image: String): Organization
  }
`;

module.exports = typeDefs;
