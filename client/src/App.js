import React, { useState, useEffect } from "react";
import "./App.css";
import StripeContainer from "./components/StripeContainer";
import test from './assets/test.png'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Success from "./pages/success";
export default function App() {
  
const[showItem, setShowItem] = useState(false)


return (
  <Router>
    <div className="App">
      <h1>The spatula store</h1>
      <Switch>
        <Route path="/success" component={Success} />
        <Route path="/">
          {showItem ? (
            <StripeContainer />
          ) : (
            <>
              <h3>$11.00</h3>
              <img src={test} alt="test" />
              <button onClick={() => setShowItem(true)}>
                Purchase spatula
              </button>
            </>
          )}
        </Route>
      </Switch>
    </div>
  </Router>
);
}