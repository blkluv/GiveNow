import React from "react";
import "./App.css";
import { ModalProvider } from "./utils/Context";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MyDonations from './pages/MyDonations'
import SuccessPage from "./pages/SuccessPage";
import Home from "./pages/Home";
import Navbar from "./components/Navbar"
import Donate from "./pages/Donate"
import UserProfile from "./pages/UserProfile";
import Footer from "./components/Footer"
import About from "./pages/About";
import SingleOrgPage from "./pages/SingleOrgPage";
export default function App() {
  // Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
      headers: {
          ...headers,
          authorization: token ? `Bearer ${token}` : '',
      },
  };
});
  const client = new ApolloClient({
    // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});
return (
 <ModalProvider>
  <ApolloProvider client = {client}>
  <Router>
    <div className="App">
      <Navbar />
     
  <Routes>

      <Route path="/successpage" element={<SuccessPage/>} />
      
        <Route exact path="/" element={<Home/>} /> 
        <Route exact path="/about" element={<About/>} /> 
      
<Route exact path="/donate" element={<Donate/>} /> 
<Route exact path="/mydonations" element={<MyDonations />}/> 
<Route exact path="/singleorg/:id" element={<SingleOrgPage/>} /> 
<Route exact path="/user/:id" element={<UserProfile/>} /> 
</Routes>

          

      <Footer/>
    </div>
  </Router>
  </ApolloProvider>
  </ModalProvider>
);
}