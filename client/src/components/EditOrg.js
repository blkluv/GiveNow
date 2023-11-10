// EditOrganizationModal.js
import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useMutation } from '@apollo/client';
import { EDIT_ORGANIZATION } from "../utils/mutations";
import axios from 'axios';

function EditOrganizationModal({ show, handleClose, orgDataEdit, update, uniqueCategories }) {

  const [editOrg] = useMutation(EDIT_ORGANIZATION)
    const [formState, setFormState] = useState({
      editname: "",
      editdescription: "",
      editshortdescription: "",
      editcategory: ""
    });
    const handleChange = (event) => {
      const { name, value } = event.target;
      setFormState({
        ...formState,
        [name]: value,
      });
      console.log(formState)
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
        try {
          //TODO remove old image when adding new one
          let oldImageURL = null;

          // Check if there is an old image URL
          if (orgDataEdit && orgDataEdit.image) {
            oldImageURL = orgDataEdit.image;
          }

          let imageUploadResponse = ""
          if (image) {
             imageUploadResponse = await uploadImage(image);
            console.log("Image upload response:", imageUploadResponse);
          }
          
            const mutationResponse = await editOrg({
              variables: {

                orgId: orgDataEdit? orgDataEdit._id : "",
                name: formState.editname,
                description: formState.editdescription,
               shortdescription: formState.editshortdescription,
               category: formState.editcategory,
               image: imageUploadResponse,
              },
            });
            if (oldImageURL) {
              await deleteImage(oldImageURL);
            }
           // console.log("Mutation response:", mutationResponse);
            update()
            handleClose()
        } catch (error) {
          console.log(error);
        }
      
    };
    //image handler
    const [image, setImage] = useState(null);
    const handleImageChange = (event) => {
      const file = event.target.files[0];
      setImage(file);
    };
// image upload
    const uploadImage = async (imageFile) => {
      try {
        const formData = new FormData();
        formData.append('image', imageFile);
    
        // Replace 'http://your_domain.com/upload' with your actual server's upload endpoint
        const response = await axios.post('http://localhost:4000/upload', formData);
    
        // Assuming the server responds with the image URL
        return response.data.imageUrl;
      } catch (error) {
        console.error('Error uploading image:', error);
        throw new Error('Image upload failed');
      }
    };
   // handle old image delete
   const deleteImage = async (imageURL) => {
    try {
      // Make an HTTP request to your server to handle the image deletion
      const response = await axios.post('http://localhost:4000/deleteImage', { imageURL });
      console.log("Image deleted:", response.data);
    } catch (error) {
      console.error('Error deleting image:', error);
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
            <Form.Control name= "editname" onChange={handleChange} type="text" defaultValue={orgDataEdit ? orgDataEdit.name : ""} autoFocus />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Org Short Description</Form.Label>
            <Form.Control name="editshortdescription" onChange={handleChange} as="textarea" rows={2} defaultValue={orgDataEdit? orgDataEdit.shortdescription : "No Short description"}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Org Description</Form.Label>
            <Form.Control name="editdescription" onChange={handleChange} as="textarea" rows={10} defaultValue={orgDataEdit? orgDataEdit.description : "No description"}/>
          </Form.Group>
          <Form.Label>Category</Form.Label>
      <Form.Select aria-label="Default select example" name="editcategory"  onChange={handleChange}>
        
      <option value="">Select a category</option> 
      {
        uniqueCategories.map((category, index) => (
          <option key={index} value={category}>
            {category}
          </option>
        ))}
    </Form.Select>
    <Form.Group className="mb-3">
                    <Form.Label>Org Image</Form.Label>
                    <Form.Control name="image" type="file" accept="image/*" onChange={handleImageChange} />
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