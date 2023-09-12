import React from 'react';

import { GET_USER } from '../utils/queries';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';

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
const UserProfile = () => {
  const { id } = useParams();
  const { loading, data, refetch } = useQuery(GET_USER, {
    variables: { userId: id},
    pollInterval: 60000, // Poll the server every 60 seconds (adjust this interval as needed)
  });

  // Function to manually trigger a data refresh
  const refreshData = () => {
    refetch();
  };


    // Check if data is still loading
    if (loading) {
      return <p>Loading...</p>; // You can display a loading indicator here
    }

    // Check if data.me exists before accessing its properties
   if(data){
      console.log(data,"------------------------------------me--------------------")
      return (
        <div>
          <button onClick={refreshData}>Refresh Data</button>
          <h1>My donations</h1>
          <div>
            <h2>userinfo</h2>
            <p>username: {data.user.username}</p>
            <p>email: {data.user.email}</p>
            <p>topdoner: {data.user.topdoner == true ? `${data.user.username} is a Top Donor!` : "Not"}</p>

          </div>
          <div>
            <h2>Donations</h2>
            {/* Render donations data, you might want to map through it */}
           <div style={styles.donationsDivStyle}>
              {data.user.donations.map((donation) => (
                
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

};

export default UserProfile;