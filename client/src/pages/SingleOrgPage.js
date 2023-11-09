
import React, { useEffect, useState } from 'react';
import { GET_ORGANIZATION } from '../utils/queries';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import Spinner from 'react-bootstrap/Spinner';
import Card from 'react-bootstrap/Card';
import StripeContainer from "../components/StripeContainer";
const divStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
};

function SingleOrgPage(props) {
  //  console.log(props,"hi kai")
  const [showItem, setShowItem] = useState(false);
  const [amount, setAmount] = useState(0);
  const [customAmounts, setCustomAmounts] = useState(0); 
  const { id } = useParams();
  const { loading, data, error, refetch } = useQuery(GET_ORGANIZATION, {
    variables: { orgId: id },
  });

  const [width, setWidth] = useState(window.innerWidth);

  const handleResize = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    // Attach event listener for window resize
    window.addEventListener('resize', handleResize);

    // Clean up the event listener when the component is unmounted
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const styles = {
    card: {
      width: width < 780 ? '95%' : '45rem', 
      alignSelf: 'center', 
      textAlign: 'center'
    },
      container:{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '5%'
      },
      singleOrg: {
        textAlign: "center",
        margin: "1%",
        padding: "1%",
        border: "1px solid black",
        width: width < 780 ? '95%' : '45rem', 
        alignSelf: 'center'
    },
    preAmountDiv: {
      display: "flex"
  }
  }
//
  const setItem = ( price) => {
    setAmount(price);
    setShowItem(true)
  };
  const handleCustomAmountChange = (event, org) => {
    const newCustomAmount = event.target.value;
    // Update the customAmounts dictionary with the custom amount for the specific organization
    setCustomAmounts(newCustomAmount)
  };

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
const cardImageUrl = organization.image.startsWith('http') ? organization.image :  `${baseUrl}/${organization.image}`;
function formatAmount(amount) {
  return amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}
  // console.log(organization,"---------here")
  // use info from props and data from query
  return (
    <div style={styles.container} >
     {/* TODO add edit/delete buttons */}
       <Card style={styles.card}>
      <Card.Img variant="top" src={cardImageUrl} />
      <Card.Body>
        <Card.Title>{organization.name}</Card.Title>
        <Card.Text>
          {organization.description}
        </Card.Text>
        <Card.Footer>Amount Raised: {formatAmount(organization.amountraised / 100)}$</Card.Footer>
        {/* <Button variant="primary">Donate</Button> */}
      </Card.Body>
    </Card>
    {showItem === false ? 
    <div style={styles.singleOrg} >
    <div style={styles.preAmountDiv}>
                <button className="preAmount" onClick={() => handleCustomAmountChange({ target: { value: 5.00 } })}>
                  ${(5.00).toFixed(2)}
                </button>
                <button className="preAmount" onClick={() => handleCustomAmountChange({ target: { value: 10.00 } })}>
                  ${(10.00).toFixed(2)}
                </button>
                <button className="preAmount" onClick={() => handleCustomAmountChange({ target: { value: 20.00 } })}>
                  ${(20.00).toFixed(2)}
                </button>
                <button className="preAmount" onClick={() => handleCustomAmountChange({ target: { value: 50.00 } })}>
                  ${(50.00).toFixed(2)}
                </button>
              </div>
              <div>
                <span>$</span>
                <input
                  type="number"
                  id={organization._id}
                  value={customAmounts}
                  onChange={(event) => handleCustomAmountChange(event)}
                />
                <span>USD</span>
                <button className="button2" onClick={() => setItem(customAmounts * 100)}>GiveNow</button>
              </div>
              </div>
              : 
            
        <StripeContainer amount={amount} itemName={organization.name} description={organization.description} OrgID={organization._id} />
     
              }
    </div>
  );
}

export default SingleOrgPage;