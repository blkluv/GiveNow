import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { GET_ORGANIZATIONS2 } from "../utils/queries";
import { useQuery } from '@apollo/client';
import { useMutation } from "@apollo/client";
import { MAKE_ORGANIZATION } from '../utils/mutations';
import { GET_ME } from '../utils/queries';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

const Addorg = () => {
  const { loading: loading2, data: data2 } = useQuery(GET_ME);
    const [makeOrganization] = useMutation(MAKE_ORGANIZATION);
    const { loading, data, error } = useQuery(GET_ORGANIZATIONS2)
    const [formState, setFormState] = useState({
        name: "",
        description: "",
        category: "",
        shortdescription: ""
      });
      const [image, setImage] = useState(null);

      const handleImageChange = (event) => {
        const file = event.target.files[0];
        setImage(file);
      };
      const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({
          ...formState,
          [name]: value,
        });
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
      
        if (formState.category === "") {
          console.log("Need to Select a category!");
        } else {
          try {
            // Ensure image is not null and has a valid URL
            if (image) {
              const imageUploadResponse = await uploadImage(image);
              console.log("Image upload response:", imageUploadResponse);
      
              const mutationResponse = await makeOrganization({
                variables: {
                  name: formState.name,
                  description: formState.description,
                  shortdescription: formState.shortdescription,
                  category: formState.category,
                  image: imageUploadResponse,  // Update with the correct image URL
                },
              });
      
              console.log("Mutation response:", mutationResponse);
            } else {
              console.error("Image is null or invalid.");
            }
          } catch (error) {
            console.log(error);
          }
        }
      };
      
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
      
let uniqueCategories = []
if (data && data.organizations) {
  uniqueCategories = [...new Set(data.organizations.map((org) => org.category))];
}
   
//  const styles = {

//  }
if (loading2) {
  return <p>Loading...</p>;
}
if (data2 && data2.me.isAdmin === true) {
    return (
      <div>
        <h1 >Addorg</h1>
        <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" >
        <Form.Label>Name</Form.Label>
        <Form.Control name= "name" type="text" required={true} placeholder="org name..." onChange={handleChange} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Short Description</Form.Label>
        <Form.Control as="textarea" rows={2} required={true} min={1} maxLength={50}  name="shortdescription" placeholder="Short description describing your org..." onChange={handleChange} />
      </Form.Group>
        <Form.Label>Detailed Description</Form.Label>
        <Form.Control as="textarea" rows={3} required={true}  name="description" placeholder="Detailed org description..." onChange={handleChange} />
      </Form.Group>
      <Form.Label>Category</Form.Label>
      <Form.Select aria-label="Default select example" name="category"  onChange={handleChange}>
        
      <option value="">Select a category</option> 
      {!loading &&
        uniqueCategories.map((category, index) => (
          <option key={index} value={category}>
            {category}
          </option>
        ))}
    </Form.Select>
        <Form.Group className="mb-3">
                    <Form.Label>Image</Form.Label>
                    <Form.Control name="image" type="file" accept="image/*" onChange={handleImageChange} />
                </Form.Group>
    <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
      
      </div>
    );
        }
        else{
          return(
            <div>
        <h1>Admin only!</h1>
      </div>
          )
        }
  
};

export default Addorg;