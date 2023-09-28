
import React, { useEffect,useState } from 'react';
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
const styles = {
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
      border: "1px solid black"
  },
  preAmountDiv: {
    display: "flex"
}
}
function SingleOrgPage(props) {
  //  console.log(props,"hi kai")
  const [showItem, setShowItem] = useState(false);
  const [amount, setAmount] = useState(0);
  const [customAmounts, setCustomAmounts] = useState(0); 
  const { id } = useParams();
  const { loading, data, error, refetch } = useQuery(GET_ORGANIZATION, {
    variables: { orgId: id },
  });

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

  // console.log(organization,"---------here")
  // use info from props and data from query
  return (
    <div style={styles.container} >
       <Card style={{ width: '40rem', alignSelf: 'center', textAlign: 'center'}}>
      <Card.Img variant="top" src={cardImageUrl} />
      <Card.Body>
        <Card.Title>{organization.name}</Card.Title>
        <Card.Text>
          {organization.description}
        </Card.Text>
        <Card.Footer>Amount Raised: {organization.amountraised}</Card.Footer>
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