import { gql } from '@apollo/client';
//This holds the query GET_ME, which will execute the me query set up using Apollo Server.
export const GET_ME = gql`
  { 
    me {
      _id
      username
      email
      topdoner
      donations {
        _id
        amount
        date
        organization {
          name
        }
      }
    }
  }
`;

export const GET_ORGANIZATION = gql`
query Query($orgId: ID!) {
  org(orgId: $orgId) {
    amountraised
    _id
    description
    name
    category
    image
   
    topDonors {
      user {
        _id
        username
      }
      donationAmount
    }
  }
}
`;
export const GET_USER = gql`
query Query($userId: ID!) {
  user(userId: $userId) {
    _id
    email
    topdoner
    username
    donations {
      _id
      amount
      date
      organization {
        _id
        name
      }
    }
  }
}
`;
export const GET_ORGANIZATIONS = gql`
query Query {
  organizations {
    _id
    name
    shortdescription
    description
    category
    amountraised
    image
    donationsmade
    date
  }
}
`
export const GET_ORGANIZATIONS2 = gql`
query Query {
  organizations {
    category
  }
}
`