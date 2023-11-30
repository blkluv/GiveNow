import React, {  useState } from "react";
import {
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios"
import { useMutation } from "@apollo/client";
import { MAKE_DONATION } from "../utils/mutations";
import Success from '../pages/SuccessPage';
const styles = {
  form:{
    display: 'flex',
    flexDirection: 'column',
    
    border: "1px solid black",
    padding: '1%',
    borderRadius: "4px",
    margin: "5%"
  },
  additionalInfo: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  input: {
    marginTop: '10px',
    padding: '10px',
    width: '98%', // Adjust the width as needed
    boxSizing: 'border-box',
    fontSize: '16px',
  },
}


const CARD_OPTIONS = {
	iconStyle: "solid",
	style: {
		base: {
			iconColor: "#c4f0ff",
			color: "black",
			fontWeight: 500,
			fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
			fontSize: "16px",
			fontSmoothing: "antialiased",
			":-webkit-autofill": { color: "#fce883" },
			"::placeholder": { color: "#87bbfd" }
		},
		invalid: {
			iconColor: "red",
			color: "red"
		}
	}
}

export default function PaymentForm(props) {
  console.log(props,"----------HERE---------------")
  const [makeDonation] = useMutation(MAKE_DONATION);
const [success, setSuccess] = useState(false)
const stripe = useStripe()
const elements = useElements()
// email state and handleing
const [email, setEmail] = useState("")
const [nameoncard, setNameOnCard] = useState("")
const handleEmailChange = (event) => {
  setEmail(event.target.value);
};
const handleNameOnCardChange = (event) => {
  setNameOnCard(event.target.value);
};
const handleSubmit = async (e) => {
  e.preventDefault();
  console.log("Handling form submission...");

  const { error, paymentMethod } = await stripe.createPaymentMethod({
    type: "card",
    card: elements.getElement(CardElement),
  });

  console.log("Stripe payment method created:", paymentMethod);

  if (!error) {
    try {
      const { id } = paymentMethod;
      console.log("Stripe payment method ID:", id);
      console.log("email", email)
      console.log("amount", props)
      console.log("name on card", nameoncard)

      const response = await axios.post("http://localhost:4000/payment", {
        amount: props.amount,
        description: props.description,
        email: email,
        id: id,
      });

      console.log("Payment API response:", response.data);

      if (response.data.success) {
        console.log("Successful payment");
        try {
          
        
        const mutationResponse = await makeDonation({
          variables: {
            organization: props.OrgID,
            amount: props.amount,
          },
        });
        console.log("Mutation response:", mutationResponse);

        setSuccess(true);
      }
      catch (error) {
          console.log(error,"mutation error")
        }
      
      }
    } catch (error) {
      console.error("Error:", error);
    }
  } else {
    console.error("Stripe error:", error);
    console.log("Stripe error message:", error.message);
  }
};

function formatAmount(amount) {
  return amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}
// TODO add more info to payment FORM like org info etc
// TODO style
  return (
<>
{!success ?

<form onSubmit={handleSubmit} style={styles.form}>
<h3>amount being charged: {formatAmount(props.amount / 100)}$</h3>

<fieldset className="FormGroup">
  <div className="FormRow">
    <CardElement options={CARD_OPTIONS}/>
    
  </div>
</fieldset>
<div style={styles.additionalInfo}>
            <input
              type="text"
              title="nameOnCard"
              placeholder="Name on card"
              required={true}
              value={nameoncard}
              onChange={handleNameOnCardChange}
              style={styles.input}
            />

            <input
              type="email"
              title="email"
              placeholder="Enter your email"
              required={true}
              value={email}
              onChange={handleEmailChange}
              style={styles.input}
            />
          </div>
<button className="button2">Pay</button>
</form>
:
<div>
  
  <Success Sucprops={props}/>
</div>
}
</>
  );
  
}

