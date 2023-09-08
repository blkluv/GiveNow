import React from 'react';
import auth from '../utils/auth';
import { GET_ME } from '../utils/queries';
import { useQuery } from '@apollo/client';

const styles = {
  donationsDivStyle: {
    background: 'white',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
   
    border: '1px solid black'
  },
  donationStyle: {
    with: '25vh',
    height: '25vh',
    border: '1px solid black',
    margin: '1%',
    padding: '1%'
  },
  list: {
    listStyleType: "none",
  }
};
const MyDonations = () => {
  const { loading, data, refetch } = useQuery(GET_ME, {
    pollInterval: 60000, // Poll the server every 60 seconds (adjust this interval as needed)
  });

  // Function to manually trigger a data refresh
  const refreshData = () => {
    refetch();
  };

  if (auth.loggedIn()) {
    // Check if data is still loading
    if (loading) {
      return <p>Loading...</p>; // You can display a loading indicator here
    }

    // Check if data.me exists before accessing its properties
    if (data && data.me) {
      //console.log(data.me,"------------------------------------me--------------------")
      return (
        <div>
          <button onClick={refreshData}>Refresh Data</button>
          <h1>My donations</h1>
          <div>
            <h2>userinfo</h2>
            <p>username: {data.me.username}</p>
            <p>email: {data.me.email}</p>
            <p>topdoner: {data.me.topdoner == true ? "You are a Top Donor!" : "Not"}</p>

          </div>
          <div>
            <h2>Donations</h2>
            {/* Render donations data, you might want to map through it */}
           <div style={styles.donationsDivStyle}>
              {data.me.donations.map((donation) => (
                
                <div key={donation._id} style={styles.donationStyle}>
                   <ul style={styles.list}>
                   <li>Organizaton: {donation.organization.name}</li>
                <li>amount: {(donation.amount/100).toFixed(2)}$</li>
                <li>Date: {donation.date}</li>
                
                </ul>
                </div>
              ))}
              </div>
         
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
