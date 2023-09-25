
import React, { useEffect } from 'react';
import { GET_ORGANIZATION } from '../utils/queries';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const divStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
};
const styles = {
    container:{
        display: 'flex',
        justifyContent: 'center',
        padding: '5%'
    }
}
function SingleOrgPage(props) {
  //  console.log(props,"hi kai")
  const { id } = useParams();
  const { loading, data, error, refetch } = useQuery(GET_ORGANIZATION, {
    variables: { orgId: id },
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




  // Handle errors
  if (error) {
    return (
      <div style={divStyle}>
    <p style={{color: 'red'}}>Error: {error.message}</p>
    </div>
    )
  }

  const organization = data?.org; 
  //need to replace base url for image to show
  const baseUrl = 'http://localhost:3000'; 
const fullImageUrl = `${baseUrl}/${organization.image}`;
  console.log(organization,"---------here")
  // use info from props and data from query
  return (
    <div style={styles.container} >
       <Card style={{ width: '40rem' }}>
      <Card.Img variant="top" src={fullImageUrl} />
      <Card.Body>
        <Card.Title>{organization.name}</Card.Title>
        <Card.Text>
          {organization.description}
        </Card.Text>
        <Card.Footer>Amount Raised: {organization.amountraised}</Card.Footer>
        <Button variant="primary">Donate</Button>
      </Card.Body>
    </Card>
    </div>
  );
}

export default SingleOrgPage;