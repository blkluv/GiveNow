import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, { useEffect } from 'react';
import { GET_ORGANIZATION } from '../utils/queries';
import { useQuery } from '@apollo/client';

function SingleOrg(props) {
  const { loading, data, error, refetch } = useQuery(GET_ORGANIZATION, {
    variables: { orgId: props.org.id },
    skip: !props.show, // Skip the query if the modal is closed
  });

  useEffect(() => {
    // Check if the modal is open before refetching the query
    if (props.show) {
      refetch(); // Refetch the query when the modal is opened
    }
  }, [props.show, refetch]);

  if (loading) {
    return <p>Loading...</p>;
  }

  // Check if the modal is closed
  if (!props.show) {
    return null;
  }

  // Handle errors
  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const organization = data?.org; // Assuming your query returns an object with an 'org' field
console.log(organization,"------here-----")
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {organization.name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Amount Raised {organization.amountraised}</h4>
        <p>{organization.description}</p>
        <h3>Top Donators </h3>
        <ul>
        {organization.topDonors.map((donor, index) =>(
          <li key={`donor_${index}`}>
            {donor.user ? donor.user.username || "Anon" : "Anon"}
            {donor.donationAmount}
          </li>
        ))}
        </ul>
      
      </Modal.Body>
      <Modal.Footer>
       
        {/* You can render the list of top donors here */}
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default SingleOrg;


