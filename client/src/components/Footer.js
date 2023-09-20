import React from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './styles/footer.css'
import { Link } from 'react-router-dom';
import auth from '../utils/auth';
const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // You can use 'auto' instead of 'smooth' for instant scrolling
    });
  };

  return (
    <footer className="w-100 mt-auto custom-bg-color p-4">
      <div className="container footer-outer text-center mb-5">
        <h4 className='h4footermadewith'>
         Funding Futures, One Click at a Time
        </h4>

        <div className='footercontainer'>

          <div className="social-links">
            <h4>Socials</h4>
            <a  className="custom-color" href="https://twitter.com/yourtwitter" target="_blank" rel="noopener noreferrer">
              <i className="bi bi-twitter"></i>
            </a>
            <a  className="custom-color" href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
              <i className="bi bi-facebook"></i>
            </a>
            <a  className="custom-color" href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
              <i className="bi bi-instagram"></i>
            </a>
          </div>
          <div className="footercontact">
            <h4>Contact</h4>
            <a className="custom-color" href="http://maps.google.com/?q=San Antonio Texas"><i className="bi bi-house-fill"></i>Address</a>
            <p className='footercontactptag'>San Antonio Texas</p>
            <a className="custom-color" href="mailto:kaikane3457@hotmail.com"><i className="bi bi-envelope-fill"></i>Email</a>
            <p className='footercontactptag'>kaikane3457@hotmail.com</p>
            <a className="custom-color" href="tel:5555555"><i className="bi bi-telephone-fill"></i>Phone</a>
            <p className='footercontactptag'>555-555-5555</p>
          </div>
          <div className="footer-navigation text-center">
            <h4>Links</h4>
            <Link className="footer-link custom-color" to="/" onClick={scrollToTop}>
              Home
            </Link>
            <Link className="footer-link custom-color" to="/donate" onClick={scrollToTop}>
              Make a Donation
            </Link>
            <Link className="footer-link custom-color" to="/contact" onClick={scrollToTop}>
              About?
            </Link>
            {auth.loggedIn() ? (
        
         <Link className="footer-link custom-color"  onClick={() => auth.logout()}>
         Logout
          </Link>
      ) : (
        // Render "Login" and "Sign Up" links when the user is not logged in
        
          <Link className="footer-link custom-color"  onClick={scrollToTop}>
         Login/Sign Up
       </Link>
        
      )}
          </div>



        </div>

        <div className='allrightsres'>
          <p className="text-center mt-3 copyright">
            &copy; {new Date().getFullYear()} GiveNow. All rights reserved.
          </p>
          <p className="text-center mt-3 made-by">
            Site made by Kai <a  className="custom-color" href="https://github.com/lacnoskillz"><i className="bi bi-github"></i></a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;