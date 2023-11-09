// EditOrganizationModal.js
import React from "react";
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useMutation } from '@apollo/client';
import { EDIT_ORGANIZATION } from "../utils/mutations";

function EditOrganizationModal({ show, handleClose, orgDataEdit }) {
    const [editOrg] = useMutation(EDIT_ORGANIZATION)
  return (
    // TODO add the other propertys for editing and test fron end edit org
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Org</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Org Name {orgDataEdit ? orgDataEdit.name : "No name"}</Form.Label>
            <Form.Control type="email" placeholder="name@example.com" autoFocus />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Org Description</Form.Label>
            <Form.Control as="textarea" rows={3} placeholder={orgDataEdit? orgDataEdit.description : "No description"}/>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditOrganizationModal;