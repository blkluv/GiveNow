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
  const [customAmounts, setCustomAmounts] = useState({}); // State to store custom amounts

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
      defaultAmount: 1100,
      image: test,
    },
    {
      name: "Cat Corp",
      description: "Corp to save the cats!",
      id: "64f7c7f25cec709320224369",
      defaultAmount: 1000,
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
          {organizations.map((org) => (
            <div key={org.id}>
              <h2>{org.name}</h2>
              <h3>{org.description}</h3>
              <img alt={org.name} src={org.image} />
              {/* Use the default amount for donation */}
              <button onClick={() => setItem(org.name, org.defaultAmount, org.description, org.id)}>
                Donate ${(org.defaultAmount / 100).toFixed(2)} to {org.name}
              </button>
              <div>
                <label>Custom Amount: $</label>
                <input
                  type="number"
                  value={customAmounts[org.id] || ''} // Use customAmounts dictionary for the specific organization
                  onChange={(event) => handleCustomAmountChange(event, org)} // Pass org as a parameter
                />
                <button onClick={() => setItem(org.name, customAmounts[org.id] * 100, org.description, org.id)}>Donate Custom Amount</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Organization;

