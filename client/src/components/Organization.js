import React, { useState } from "react";
import StripeContainer from "../components/StripeContainer";
import test from '../assets/test.jpg'
import test2 from '../assets/test2.jpg'
import '../assets/styles/Organization.css'

const Organization = () => {
  const [showItem, setShowItem] = useState(false);
  const [amount, setAmount] = useState(0);
  const [itemName, setItemName] = useState("");

  // Function to set both amount and itemName
  const setItem = (name, price) => {
    setShowItem(true);
    setAmount(price);
    setItemName(name);
  };

  return (
    <div>
      {showItem ? (
        <StripeContainer amount={amount} itemName={itemName} />
      ) : (
        <div className="OrganizationsDiv">
          <h2>A Dope Owl</h2>
          <h3>$11.00</h3>
          <img src={test} alt="test" />
          <button onClick={() => setItem("A Dope Owl", 1100)}>
            Purchase owl
          </button>
          <h2>A cute Cat</h2>
          <h3>$10.00</h3>
          <img src={test2} alt="test" />
          <button onClick={() => setItem("A cute Cat", 1000)}>
            Purchase cat
          </button>
        </div>
      )}
    </div>
  );
};

export default Organization;


