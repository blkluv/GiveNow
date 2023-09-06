import React from 'react';
import auth from '../utils/auth';
import { GET_ME } from '../utils/queries';
import { useQuery } from '@apollo/client';

const MyDonations = () => {
  const { loading, data } = useQuery(GET_ME);

  if (auth.loggedIn()) {
    // Check if data is still loading
    if (loading) {
      return <p>Loading...</p>; // You can display a loading indicator here
    }

    // Check if data.me exists before accessing its properties
    if (data && data.me) {
      return (
        <div>
          <h1>My donations</h1>
          <div>
            <h2>userinfo</h2>
            <p>username: {data.me.username}</p>
            <p>email: {data.me.email}</p>
            <p>topdoner: {data.me.topdoner.toString()}</p>
          </div>
          <div>
            <h2>Donations</h2>
            {/* Render donations data, you might want to map through it */}
            <ul>
              {data.me.donations.map((donation) => (
                <div key={donation._id}>
                <li>amount: {(donation.amount/100).toFixed(2)}$</li>
                <li>Organizaton: {donation.organization.name}</li>
                </div>
              ))}
            </ul>
          </div>
        </div>
      );
    } else {
      // Handle the case when data.me doesn't exist
      return (
        <div>
          <h1>Data not available</h1>
        </div>
      );
    }
  } else {
    return (
      <div>
        <h1>Need to log in</h1>
      </div>
    );
  }
};

export default MyDonations;
