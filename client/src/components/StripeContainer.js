import React from "react";
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./PaymentForm";
const PUBLIC_KEY = process.env.REACT_APP_STRIPE_PUBLIC_TEST

const stripeTestPromise = loadStripe(PUBLIC_KEY)

export default function StripeContainer(props) {
    // console.log(props.amount,"stripecontainer")
    // console.log(props.itemName,"stripecontainer")
    // console.log(props,"KAIIAIAIAIIA")
    return (
        <Elements stripe={stripeTestPromise}>
            <PaymentForm amount={props.amount} itemName={props.itemName} description={props.description} OrgID = {props.OrgID}/>
        </Elements>
    )
}