import React, { useState } from "react";
import StripeContainer from "../components/StripeContainer";
import test from '../assets/test.jpg'
import test2 from '../assets/test2.jpg'
import '../assets/styles/Organization.css'

const Organization = () => {
  const [showItem, setShowItem] = useState(false);
  const [amount, setAmount] = useState(0);
  const [itemName, setItemName] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [OrgID, setOrgID] = useState("");
  const [customAmount, setCustomAmount] = useState(0); // New state for custom amount

  // Function to set both amount, itemName, itemDescription, and OrgID
  const setItem = (name, price, description, orgID) => {
    console.log(price)
  
    setItemName(name);
    setItemDescription(description);
    setOrgID(orgID);
// logice to handle empty and 0 custom donation inputs
    if(price === 0 || price === "" ||  isNaN(price) || price < 0){
      console.log("enter a valid number > 0")
      setCustomAmount(0)
          }
          else if(price !== 0 && price !== "" && price > 0){
          setAmount(price);
          setShowItem(true);
          }
  };

  // Function to handle custom amount input change
  const handleCustomAmountChange = (event) => {
    const newCustomAmount = event.target.value;
    
    // Check if the entered amount is not empty and doesn't contain a negative sign
    if (!newCustomAmount.includes("-")) {
      setCustomAmount(newCustomAmount);
    }
  };

  // Define an array of organizations with their details
  const organizations = [
    {
      name: "Owl House",
      description: "Department for saving the owls!",
      id: "64f91cb13907b04fde495fbf",
      defaultAmount: 1100,
      image: test
    },
    {
      name: "Cat Corp",
      description: "Corp to save the cats!",
      id: "64f7c7f25cec709320224369",
      defaultAmount: 1000,
      image: test2
    },
    // Add more organizations as needed
  ];

  return (
    <div>
      {showItem ? (
        <StripeContainer amount={amount} itemName={itemName} description={itemDescription} OrgID={OrgID} />
      ) : (
        <div className="OrganizationsDiv">
          {organizations.map((org) => (
            <div key={org.id}>
              <h2>{org.name}</h2>
              <h3>{org.description}</h3>
              <img alt={org.name} src={org.image}/>
              {/* Use the default amount for donation */}
              <button onClick={() => setItem(org.name, org.defaultAmount, org.description, org.id)}>
                Donate ${(org.defaultAmount / 100).toFixed(2)} to {org.name}
              </button>
              <div>
                <label>Custom Amount: $</label>
                <input
                  type="number"
                  value={customAmount}
                  onChange={handleCustomAmountChange}
                />
                <button onClick={() => setItem(org.name, parseFloat(customAmount) * 100, org.description, org.id)}>Donate Custom Amount</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Organization;
