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
const multer = require('multer');

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
//image uploading
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '..','client', 'public', 'uploads'));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  },
});


const upload = multer({ storage });
app.post('/upload', upload.single('image'), (req, res) => {
  const imageUrl = `http://localhost:3000/uploads/${req.file.filename}`;
  res.json({ imageUrl });
});

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
  //delete image for client side
  app.post('/deleteImage', async (req, res) => {
    const { imageURL } = req.body;
  
    const fs = require('fs');
    const path = require('path');
    const uploadsFolderPath = path.join(__dirname, '..','client', 'public', 'uploads'); // Adjust this path
    const imageName = path.basename(imageURL);
    const filePath = path.join(uploadsFolderPath, imageName);
  
    try {
      fs.unlinkSync(filePath);
      console.log(`File deleted.`);
      res.status(200).json({ message: 'File deleted successfully' });
    } catch (err) {
      console.error(`Error deleting the file:`, err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
// Call the async function to start the server
  startApolloServer(typeDefs, resolvers);
