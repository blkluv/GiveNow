// EditOrganizationModal.js
import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useMutation } from '@apollo/client';
import { EDIT_ORGANIZATION } from "../utils/mutations";

function EditOrganizationModal({ show, handleClose, orgDataEdit, update }) {

  const [editOrg] = useMutation(EDIT_ORGANIZATION)
    const [formState, setFormState] = useState({
      editname: "",
      editdescription: "",
      shortdescription: ""
    });
    const handleChange = (event) => {
      const { name, value } = event.target;
      setFormState({
        ...formState,
        [name]: value,
      });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
        try {
          //TODO add edit image/ category andother feilds
            const mutationResponse = await editOrg({
              variables: {

                orgId: orgDataEdit? orgDataEdit._id : "",
                name: formState.editname,
                description: formState.editdescription,
                // shortdescription: formState.shortdescription,
              },
            });
    
           // console.log("Mutation response:", mutationResponse);
            update()
            handleClose()
        } catch (error) {
          console.log(error);
        }
      
    };
  return (
    // TODO add the other propertys for editing and test fron end edit org
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Org</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Org Name</Form.Label>
            <Form.Control name= "editname" onChange={handleChange} type="text" placeholder={orgDataEdit ? orgDataEdit.name : "No name"} autoFocus />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Org Description</Form.Label>
            <Form.Control name="editdescription" onChange={handleChange} as="textarea" rows={3} placeholder={orgDataEdit? orgDataEdit.description : "No description"}/>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditOrganizationModal;