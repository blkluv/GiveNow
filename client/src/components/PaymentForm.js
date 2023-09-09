import React, {  useState } from "react";
import {
  CardElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import axios from "axios"
import { useMutation } from "@apollo/client";
import { MAKE_DONATION } from "../utils/mutations";



const CARD_OPTIONS = {
	iconStyle: "solid",
	style: {
		base: {
			iconColor: "#c4f0ff",
			color: "#fff",
			fontWeight: 500,
			fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
			fontSize: "16px",
			fontSmoothing: "antialiased",
			":-webkit-autofill": { color: "#fce883" },
			"::placeholder": { color: "#87bbfd" }
		},
		invalid: {
			iconColor: "#ffc7ee",
			color: "#ffc7ee"
		}
	}
}

export default function PaymentForm(props) {
  // console.log(props,"----------HERE---------------")
  const [makeDonation] = useMutation(MAKE_DONATION);
const [success, setSuccess] = useState(false)
const stripe = useStripe()
const elements = useElements()

const handleSubmit = async (e) => {
  e.preventDefault()
  const {error, paymentMethod} = await stripe.createPaymentMethod({
    type: "card",
    card: elements.getElement(CardElement)
  })

if(!error){
  try {
  
    const {id} = paymentMethod
    const response = await axios.post("http://localhost:4000/payment", {
      amount: props.amount,
      description: props.description,
      id: id
    })
    if(response.data.success){
      
      console.log("sucess payment")
      const mutationResponse = await makeDonation({

        variables: {
            organization: props.OrgID,
            amount: props.amount,
          

        },

    });
    console.log(mutationResponse, "here")
      setSuccess(true)
      
    }
  } catch (error) {
    console.log("error", error)
  }
}
else {
  console.log(error.message)
}
}

  return (
<>
{!success ?
<form onSubmit={handleSubmit}>
<fieldset className="FormGroup">
  <div className="FormRow">
    <CardElement options={CARD_OPTIONS}/>
  </div>
</fieldset>
<button className="button2">Pay</button>
</form>
:
<div>
  <h2>You Just Donated {(props.amount /100).toFixed(2) }$ to {props.itemName} thank you so much!</h2>
</div>
}
</>
  );
  
}