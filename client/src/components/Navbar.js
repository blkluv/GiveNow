import React, {  useContext } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Modal, Tab } from 'react-bootstrap';
import SignUpForm from './SignupForm';
import LoginForm from './LoginForm';
import './styles/navbar.css'
import Auth from '../utils/auth';
import logo from '../components/styles/GiveNow.png'

import { ModalContext } from '../utils/Context'
//import NavDropdown from 'react-bootstrap/NavDropdown';
const styles = {
logo:{
  display: 'flex',
  justifyContent: 'center'
}

}
const AppNavbar = () => {
  // set modal display state
  const { showModal, toggleModal } = useContext(ModalContext);

  return (
    <>
    <div style={styles.logo}>
    
    <Nav.Link as={Link} to='/'>
    <img src={logo} alt='logo'></img>
              </Nav.Link>
    </div>
    <Navbar collapseOnSelect expand="lg" className="navbar">
      <Container>
      <Navbar.Brand as={Link} to='/'>
           GiveNow
            
          </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
          <Nav.Link as={Link} to='/donate'>
                Make a donation
              </Nav.Link>
              <Nav.Link as={Link} to='/about'>
                About
              </Nav.Link>
          </Nav>
          <Nav>
                  {/* if user is logged in show */}
  {Auth.loggedIn() ? (
   <>
      <Nav.Link as={Link} to='/mydonations'>
        MyDonations
     </Nav.Link>
      <Nav.Link onClick={Auth.logout}>Logout</Nav.Link>
    </>
   ) : (
     <Nav.Link onClick={toggleModal}>Login/Sign Up</Nav.Link>
   )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

      {/* set modal data up */}
      <Modal
        size='lg'
        show={showModal}
        onHide={toggleModal}
        aria-labelledby='signup-modal'>
        {/* tab container to do either signup or login component */}
        <Tab.Container defaultActiveKey='login'>
          <Modal.Header closeButton>
            <Modal.Title id='signup-modal'>
              <Nav variant='pills'>
                <Nav.Item>
                  <Nav.Link eventKey='login'>Login</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey='signup'>Sign Up</Nav.Link>
                </Nav.Item>
              </Nav>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tab.Content>
              <Tab.Pane eventKey='login'>
                <LoginForm handleModalClose={toggleModal} />
              </Tab.Pane>
              <Tab.Pane eventKey='signup'>
                <SignUpForm handleModalClose={toggleModal} />
              </Tab.Pane>
            </Tab.Content>
          </Modal.Body>
        </Tab.Container>
      </Modal>
    </>
  );
};

export default AppNavbar;

