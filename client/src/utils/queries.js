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
    topDonors {
      user {
        username
      }
      donationAmount
    }
  }
}
`;
