import React from 'react';
import auth from '../utils/auth';
import { GET_ME } from '../utils/queries';
import { useQuery } from '@apollo/client';
import topdonor from '../components/styles/topdonor.png'
// TODO style and make responsive
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
    pollInterval: 60000,
  });

  // Function to manually trigger a data refresh
  const refreshData = () => {
    refetch();
  };

  if (loading) {
    return <p>Loading...</p>;
  }
  console.log('Data:', data);

  if (data && data.me && auth.loggedIn()) {
    return (
      <div>
        <button onClick={refreshData}>Refresh Data</button>
        <h1>My donations</h1>
        <div>
          <h2>userinfo</h2>
          <p>username: {data.me.username}</p>
          <p>email: {data.me.email}</p>
          <p>topdoner: {!data.me.topdonor ? <img src={topdonor} alt='top donor badge' /> : 'not top doner'}</p>
        </div>
        <div>
          <h2>Donations</h2>
          <div style={styles.donationsDivStyle}>
            {data.me.donations.length > 0 ? (
              data.me.donations.map((donation) => (
                <div key={donation._id} style={styles.donationStyle}>
                  <ul style={styles.list}>
                    <li>Organization: {donation.organization.name}</li>
                    <li>Amount: {(donation.amount / 100).toFixed(2)}$</li>
                    <li>Date: {donation.date}</li>
                  </ul>
                </div>
              ))
            ) : (
              <div style={styles.donationStyle}>No donations yet!</div>
            )}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <h1>No data!</h1>
      </div>
    );
  }
};


export default MyDonations;
