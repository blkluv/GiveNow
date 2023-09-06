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
console.log(data.me.donations,"data vovejabskjdbasd")
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
                <li key={donation._id}>{/* Render donation details here */}</li>
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
