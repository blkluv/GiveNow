import React from 'react';
import auth from '../utils/auth';
import { GET_ME } from '../utils/queries';
import { useQuery } from '@apollo/client';
import topdonor from '../components/styles/topdonor.png'
import { useNavigate } from 'react-router-dom';
import '../components/styles/mydonations.css'
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
  },

};

const MyDonations = () => {

  const navigate = useNavigate();
const redirect = () => {
  console.log("redirect")
  navigate('/addorg')
}
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
      <div >
       
        <div className='userbadgediv'>
        <div className='userinfodiv'>
        <h2>userinfo</h2>
          <p>username: {data.me.username}</p>
          <p>email: {data.me.email}</p>
          {data.me.isAdmin === true? <p>Role: Admin</p> : null}
          {data.me.isAdmin === true? <button onClick={redirect}>Add an Org</button> : null}
          </div>
          <div className='badgesection'>
          <h2>Badges</h2>
          <div className='badgecontainer'>
            
          <div className='badgediv'>
          {data.me.topdoner ? (
  <>
    <img className="badgeimg" src={topdonor} alt="top donor badge" />
    <p>Top Donor Badge</p>
  </>
) : (
  'not top donor'
)}
          </div>
      
          

          </div>
          </div>
        </div>
        <div>
          <h2>Donations</h2>
          <button onClick={refreshData}>Refresh Data</button>
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
