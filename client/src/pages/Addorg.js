import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { GET_ORGANIZATIONS2 } from "../utils/queries";
import { useQuery } from '@apollo/client';
import { useMutation } from "@apollo/client";
import { MAKE_ORGANIZATION } from '../utils/mutations';
import Button from 'react-bootstrap/Button';
const Addorg = () => {
    const [makeOrganization] = useMutation(MAKE_ORGANIZATION);
    const { loading, data, error } = useQuery(GET_ORGANIZATIONS2)
    const [formState, setFormState] = useState({
        name: "",
        description: "",
        category: "",
      });

      const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({
          ...formState,
          [name]: value,
        });
      };

      const handleSubmit = async (e) => {
        e.preventDefault()
        if(formState.category === ""){
            console.log("Need to Select a category!")
        }
        else{
            try {
                const mutationResponse = await makeOrganization({
                    variables: {
                      name: formState.name,
                      description: formState.description,
                      category: formState.category
                    },
                  });
                  console.log("Mutation response:", mutationResponse);
            } catch (error) {
                console.log(error)
            }
            
        }
        
      };
let uniqueCategories = []
    if(!loading){
        console.log(data)
         uniqueCategories = [...new Set(data.organizations.map((org) => org.category))];
         console.log(uniqueCategories,"here")
      
    }
   
//  const styles = {

//  }

    return (
      <div>
        <h1 >Addorg</h1>
        <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" >
        <Form.Label>Name</Form.Label>
        <Form.Control name= "name" type="text" required={true} placeholder="org name..." onChange={handleChange} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Description</Form.Label>
        <Form.Control as="textarea" rows={3} required={true}  name="description" placeholder="org description..." onChange={handleChange} />
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
    <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
      
      </div>
    );
  
};

export default Addorg;