const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const db = require('./config/connection');
const { authMiddleware } = require('./utils/auth');
const { typeDefs, resolvers } = require('./schemas');
const stripe = require('stripe')('sk_test_51NkBSxGYCFpESPA0zF23TVlklZXHlB4wS40q45kzu48hUPmUejbTjxYjBk5wyg906kobWHVpzCdA1OY0lSJGUoKn00DUHIbp4b');

const app = express();
const PORT = process.env.PORT || 3001;
const YOUR_DOMAIN = 'http://localhost:4242';

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

// Stripe Checkout endpoint
app.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price: 'price_1NkCvQGYCFpESPA03374LeJV',
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${YOUR_DOMAIN}?success=true`,
    cancel_url: `${YOUR_DOMAIN}?canceled=true`,
    automatic_tax: { enabled: true },
  });

  res.redirect(303, session.url);
});

// Serve the React app's HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// Start server
db.once('open', () => {
  app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
});
