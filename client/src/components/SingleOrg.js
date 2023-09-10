import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React from 'react';
function SingleOrg(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
         {props.org.name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Amount donated here</h4>
        <p>
        {props.org.description}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <p>top doners here?</p>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
export default SingleOrg