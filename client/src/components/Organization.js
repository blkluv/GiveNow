import React, { useState } from "react";
import StripeContainer from "../components/StripeContainer";
import test from '../assets/test.jpg'
import test2 from '../assets/test2.jpg'
import '../assets/styles/Organization.css'
import SingleOrg from "./SingleOrg";

const Organization = () => {
  const [modalShow, setModalShow] = React.useState(false);
  const [showItem, setShowItem] = useState(false);
  const [amount, setAmount] = useState(0);
  const [itemName, setItemName] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [OrgID, setOrgID] = useState("");
  const [customAmounts, setCustomAmounts] = useState({}); // State to store custom amounts
  const [orgdata, setorgdata] = useState("");
  // Function to set both amount, itemName, itemDescription, and OrgID
  const setItem = (name, price, description, orgID) => {
    setShowItem(true);
    setAmount(price);
    setItemName(name);
    setItemDescription(description);
    setOrgID(orgID);
  };

  // Define an array of organizations with their details
  const organizations = [
    {
      name: "Owl House",
      description: "Department for saving the owls!",
      id: "64f91cb13907b04fde495fbf",
     
      image: test,
    },
    {
      name: "Cat Corp",
      description: "Corp to save the cats!",
      id: "64f7c7f25cec709320224369",
  
      image: test2,
    },
    // Add more organizations as needed
  ];

  // Function to handle custom amount input change for a specific organization
  const handleCustomAmountChange = (event, org) => {
    const newCustomAmount = event.target.value;
    // Update the customAmounts dictionary with the custom amount for the specific organization
    setCustomAmounts((prevCustomAmounts) => ({
      ...prevCustomAmounts,
      [org.id]: parseFloat(newCustomAmount),
    }));
  };

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
          {organizations.map((org) => (
            <div className="singleOrg" key={org.id}>
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
                  id={org.id}
                  value={customAmounts[org.id] || ''}
                  onChange={(event) => handleCustomAmountChange(event, org)}
                />
                <span>USD</span>
                <button className="button2" onClick={() => setItem(org.name, customAmounts[org.id] * 100, org.description, org.id)}>GiveNow</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Organization;

