import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, { useEffect } from 'react';
import { GET_ORGANIZATION } from '../utils/queries';
import { useQuery } from '@apollo/client';
import Spinner from 'react-bootstrap/Spinner';
const divStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
};
const styles = {
  descrptionP: {
    overflow: "hidden", /* or auto, scroll, visible */
    //whiteSpace: "nowrap", /* Prevents text from wrapping to the next line */
    textOverflow: "ellipsis", /* Display an ellipsis (...) for clipped text */
    maxWidth: "100%",
    wordBreak: "break-all"
  }
}
function SingleOrg(props) {
  //  console.log(props,"hi kai")
  const { loading, data, error, refetch } = useQuery(GET_ORGANIZATION, {
    variables: { orgId: props.org._id },
    skip: !props.show, // Skip the query if the modal is closed
  });

  useEffect(() => {
    // Check if the modal is open before refetching the query
    if (props.show) {
      refetch(); // Refetch the query when the modal is opened
    }
  }, [props.show, refetch]);
// show spinner if loading
  if (loading) {
    return  (  <div style={divStyle}>
    <Spinner animation="border" role="status" variant="primary">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  </div>
    )
  }

  // Check if the modal is closed
  if (!props.show) {
    return null;
  }

  // Handle errors
  if (error) {
    return (
      <div style={divStyle}>
    <p style={{color: 'red'}}>Error: {error.message}</p>
    </div>
    )
  }

  const organization = data?.org; 
  // console.log(organization,"---------here")
  // use info from props and data from query
// TODO test responsivness with long values for orgs in small View ports
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.org.name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <h4>Amount Raised: {(organization.amountraised / 100).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</h4>

        <p style={styles.descrptionP}>{props.org.description}</p>
        <h4>Top Donators </h4>
        {organization.topDonors.length ?(
        <ul>
       {organization.topDonors.map((donor, index) =>(
       <li key={`donor_${index}`}>
       {donor.user && donor.user.username !== "Anon" ? (
         <a href={`user/${donor.user._id}`}>{donor.user.username}</a>
       ) : (
         "Anon"
       )}
       &nbsp;
       {(donor.donationAmount / 100).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
     </li>
     
        ))}
        
        </ul>)
        : (<p>No Donations Yet :(</p>)}
      
      </Modal.Body>
      <Modal.Footer>
       
      
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default SingleOrg;


