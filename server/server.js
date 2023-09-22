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

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});


// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Serve static files if in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.use('', express.static(path.join(__dirname, '../client/public/images')));
//may need this later for production
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, '../client/build/index.html'));
// });
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../client/build/index.html'));
// });
app.post("/payment", cors(), async (req,res) => {
  let {amount , id , description, email} = req.body
  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: "USD",
      description: description,
      payment_method: id,
      confirm: true,
      receipt_email: email,
      
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

const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  server.applyMiddleware({ app });
  
  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    })
  })
  };
  
// Call the async function to start the server
  startApolloServer(typeDefs, resolvers);
