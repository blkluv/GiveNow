const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const db = require('./config/connection');
const { authMiddleware } = require('./utils/auth');
const { typeDefs, resolvers } = require('./schemas');
require('dotenv').config()
const stripe = require("stripe")(process.env.REACT_APP_STRIPE_SECRET_TEST);
const app = express();
const PORT = process.env.PORT || 4000;
const cors = require('cors');


app.use(cors());
// GraphQL setup

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

apolloServer.applyMiddleware({ app });

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files if in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

// Serve your GraphQL API from a specific route
app.use('/graphql', (req, res, next) => {
  // Your GraphQL route handling logic here
});


// Serve the React app's HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});
app.post("/payment", cors(), async (req,res) => {
  let {amount , id } = req.body
  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: "USD",
      description: "spatular stuff",
      payment_method: id,
      confirm: true,
      return_url: "https://localhost:3000/success",
    })

    console.log("Payement", payment)
    res.setHeader('Content-Type', 'application/json');
    
    res.status(200).json({
      
      
      message: "Payment Successful!",
      success: true
    });
  } catch (error) {
    console.log("ERROR", error)
    res.setHeader('Content-Type', 'application/json');

    res.json({
      message: "Payment Failed",
      success: false
    })
  }
}
)

app.post('/stripe-webhook', async (req, res) => {
  const event = req.body;

  if (event.type === 'payment_intent.succeeded') {
    // Payment succeeded, initiate redirection to success page
    res.json({ received: true }); // Send a response to acknowledge receipt of the webhook event
  }
});
// Start server
db.once('open', () => {
  app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
});
