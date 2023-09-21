import React, { useState } from "react";
import StripeContainer from "../components/StripeContainer";
import { GET_ORGANIZATIONS } from "../utils/queries";
import { useQuery } from '@apollo/client';
import './styles/Organization.css'
import SingleOrg from "./SingleOrg";

const Organization = ({ selectedCategory, setShowItem, showItem }) => {
  const [modalShow, setModalShow] = React.useState(false);

  const [amount, setAmount] = useState(0);
  const [itemName, setItemName] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [OrgID, setOrgID] = useState("");
  const [customAmounts, setCustomAmounts] = useState({}); // State to store custom amounts
  const [orgdata, setorgdata] = useState("");
  const { loading, data, error } = useQuery(GET_ORGANIZATIONS)
  console.log(data)

  // Function to set both amount, itemName, itemDescription, and OrgID
  const setItem = (name, price, description, orgid) => {
    setShowItem(true);
    setAmount(price);
    setItemName(name);
    setItemDescription(description);
    console.log(orgid,"==== org id here =====")
    setOrgID(orgid);
  };


  // Function to handle custom amount input change for a specific organization
  const handleCustomAmountChange = (event, org) => {
    const newCustomAmount = event.target.value;
    // Update the customAmounts dictionary with the custom amount for the specific organization
    setCustomAmounts((prevCustomAmounts) => ({
      ...prevCustomAmounts,
      [org._id]: parseFloat(newCustomAmount),
    }));
  };
  if(!loading){
    let organizations = data.organizations
 
  return (
    <div>
      {showItem ? (
        
        <StripeContainer amount={amount} itemName={itemName} description={itemDescription} OrgID={OrgID} />
      ) : (
        
        <div className="OrganizationsDiv">
           <SingleOrg
        show={modalShow}
      org={orgdata}
        onHide={() => setModalShow(false)}
      />
           { organizations
            .filter((org) => selectedCategory === null || org.category === selectedCategory)
            .map((org) => (
            <div className="singleOrg" key={org._id}>
              
              <h2>{org.name}</h2>
              <h3>{org.description}</h3>
              <img alt={org.name} src={org.image} onClick={() => { setModalShow(true); setorgdata(org) }}/>
              <h3>Donate to {org.name}</h3>
              <div className="preAmountDiv">
                <button className="preAmount" onClick={() => handleCustomAmountChange({ target: { value: 5.00 } }, org)}>
                  ${(5.00).toFixed(2)}
                </button>
                <button className="preAmount" onClick={() => handleCustomAmountChange({ target: { value: 10.00 } }, org)}>
                  ${(10.00).toFixed(2)}
                </button>
                <button className="preAmount" onClick={() => handleCustomAmountChange({ target: { value: 20.00 } }, org)}>
                  ${(20.00).toFixed(2)}
                </button>
                <button className="preAmount" onClick={() => handleCustomAmountChange({ target: { value: 50.00 } }, org)}>
                  ${(50.00).toFixed(2)}
                </button>
              </div>
              <div>
                <span>$</span>
                <input
                  type="number"
                  id={org._id}
                  value={customAmounts[org._id] || ''}
                  onChange={(event) => handleCustomAmountChange(event, org)}
                />
                <span>USD</span>
                <button className="button2" onClick={() => setItem(org.name, customAmounts[org._id] * 100, org.description, org._id)}>GiveNow</button>
              </div>
           
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
else{
  return(
    <h1>LOADING...</h1>
  )
}
};

export default Organization;

