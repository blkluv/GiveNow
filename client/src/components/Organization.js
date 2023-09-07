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
  const [customAmount, setCustomAmount] = useState(""); // New state for custom amount

  // Function to set both amount and itemName
  const setItem = (name, price, description, OrgID) => {
    setShowItem(true);
    setAmount(price);
    setItemName(name);
    setItemDescription(description)
    setOrgID(OrgID)
  };

  // Function to handle custom amount input change
  const handleCustomAmountChange = (event) => {
    const newCustomAmount = event.target.value;
    setCustomAmount(newCustomAmount);
  };
const owlhouseDescription = "Department for saving the owls!"
const catcorpDescription = "Corp for saving the cats!"
const catcorpID = "64f7c7f25cec709320224369"
const owlhouseID ="64f91cb13907b04fde495fbf"

  return (
    <div>
      {showItem ? (
        <StripeContainer amount={amount} itemName={itemName} description={itemDescription} OrgID={OrgID}/>
      ) : (
        <div className="OrganizationsDiv">
          <h2>Owl House</h2>
          <h3>Department for saving the owls!</h3>
          <img src={test} alt="test" />
          <button onClick={() => setItem("Owl House", 1100, owlhouseDescription, owlhouseID)}>
            Donate 11.00 $ to Owl House
          </button>
          <div>
            <label>Custom Amount: $</label>
            <input
              type="number"
              value={customAmount}
              onChange={handleCustomAmountChange}
            />
            <button onClick={ () => setItem("Owl House", parseFloat(customAmount) * 100, owlhouseDescription, owlhouseID)}>Set Custom Amount</button>
          </div>
          {/*  */}
          <h2>Cat Corp</h2>
          <h3>Corp to save the cats!</h3>
          <img src={test2} alt="test" />
          <button onClick={() => setItem("Cat Corp", 1000, catcorpDescription, catcorpID)}>
            Donate 10.00$ to Cat Corp
          </button>
          <div>
            <label>Custom Amount: $</label>
            <input
              type="number"
              value={customAmount}
              onChange={handleCustomAmountChange}
            />
            <button onClick={ () => setItem("Cat Corp", parseFloat(customAmount) * 100, catcorpDescription, catcorpID)}>Set Custom Amount</button>
          </div>
          {/* Input field for custom amount */}
       
        </div>
      )}
    </div>
  );
};

export default Organization;


