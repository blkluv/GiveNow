import React, { useState, useEffect } from "react";
import StripeContainer from "../components/StripeContainer";
import { GET_ORGANIZATIONS } from "../utils/queries";
import { REMOVE_ORGANIZATION} from "../utils/mutations";
import { useQuery } from '@apollo/client';
import './styles/Organization.css'
import SingleOrg from "./SingleOrg";
import Pagination from "./Pagination";
import { GET_ME } from '../utils/queries';
import { useMutation } from '@apollo/client';
import EditOrganizationModal from "./EditOrg";
const Organization = ({ selectedCategory, setShowItem, showItem, searchQuery}) => {
  const [modalShow, setModalShow] = React.useState(false);
  const { loading: loading2, data: data2 } = useQuery(GET_ME);
  const [removeOrg] = useMutation(REMOVE_ORGANIZATION);
  const [amount, setAmount] = useState(0);
  const [itemName, setItemName] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [OrgID, setOrgID] = useState("");
  const [customAmounts, setCustomAmounts] = useState({}); // State to store custom amounts
  const [orgdata, setorgdata] = useState("");
  const { loading, data, error, refetch } = useQuery(GET_ORGANIZATIONS)
   const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  // console.log(data)
  //Modal states
  const [orgDataEdit, setOrgDataEdit] = useState(null);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (org) => {
    setOrgDataEdit(org);
    console.log(org)
    setShow(true); // Assuming 'setShow' is used to show the modal
  };
  useEffect(() => {
    // Reset currentPage whenever selectedCategory changes
    setCurrentPage(1);
  }, [selectedCategory]);
  
  useEffect(() => {
    // Reset currentPage whenever searchQuery changes
    setCurrentPage(1);
  }, [searchQuery]);

  // Function to set both amount, itemName, itemDescription, and OrgID
  // TODO fix bug when nno amount entered continues to checkout
  const setItem = (name, price, description, orgid) => {
    if(!price){
      alert("enter a valid amount to donate")
      return
    }
    setShowItem(true);
    setAmount(price);
    setItemName(name);
    setItemDescription(description);
    //console.log(orgid,"==== org id here =====")
    setOrgID(orgid);
  };

 
  // Function to handle custom amount input change for a specific organization
  const handleCustomAmountChange = (event, org) => {
    const newCustomAmount = event.target.value;
  
    // Use regex to allow only xx.xx format for USD amounts
    const isValidAmount = /^\d+(\.\d{1,2})?$/.test(newCustomAmount);
  
    if (isValidAmount) {
      const amountInDollars = parseFloat(newCustomAmount);
  
      // Check if the amount is within the allowed limit (1,000,000)
      if (amountInDollars <= 1000000) {
        // Update the customAmounts dictionary with the custom amount for the specific organization
        setCustomAmounts((prevCustomAmounts) => ({
          ...prevCustomAmounts,
          [org._id]: amountInDollars,
        }));
      } else {
        // Alert the user or handle the case where the amount exceeds the limit
        alert('Amount cannot exceed 1,000,000 USD.');
      }
    } else {
      // Alert the user or handle the case where the input is not in the correct format
      // alert('Please enter a valid USD amount (e.g., xx.xx).');
    }
  };
  
  


  if(!loading){
    let organizations = data.organizations;
    let uniqueCategories = []
    if (data && data.organizations) {
      uniqueCategories = [...new Set(data.organizations.map((org) => org.category))];
    }
    // Apply search query filter if available
    if (searchQuery) {
      organizations = organizations.filter(org =>
        org.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply category filter
    const filteredOrganizations =
      selectedCategory === null
        ? organizations
        : organizations.filter(org => org.category === selectedCategory);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredOrganizations.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = pageNumber => setCurrentPage(pageNumber);
   
    //function to remove org
    const startremoveOrg = async (orgid) => {
      const confirmed = window.confirm("Permanently Delete Organization?");
  
      if (confirmed) {
          try {
              //const mutationResponse = 
              await removeOrg({
                  variables: {
                      orgId: orgid
                  }
              });
              //console.log("Mutation response:", mutationResponse);
refetch()
          } catch (err) {
              console.error(err);
          }
      }
  };
  return (
    <div>
      {/* Modal Component for editing ORg */}
      <EditOrganizationModal show={show} handleClose={handleClose} orgDataEdit={orgDataEdit} update={refetch} uniqueCategories={uniqueCategories}/>
      {/* shows stripecontatiner when donate button is clicked */}
      {showItem ? (
        
        <StripeContainer amount={amount} itemName={itemName} description={itemDescription} OrgID={OrgID} />
      ) : (
        
        <div className="OrganizationsDiv">
           <SingleOrg
        show={modalShow}
      org={orgdata}
        onHide={() => setModalShow(false)}
      />
           {currentItems.length ? (
              currentItems.map(org => (
            <div className="singleOrg" key={org._id}>
              {data2 && data2.me && data2.me.isAdmin === true ? (
                <div className="AdminBTNs">
    <button className="removeorgbtn" onClick={() => {startremoveOrg(org._id)}}>X</button>
    <button className="editorgbtn" onClick={() => {handleShow(org)}}>&#9999;&#65039;</button>
    </div>
) : null}
              <h2>{org.name}</h2> 


              <p>{org.shortdescription}</p>
              <img alt={org.name} src={org.image} onClick={() => { setModalShow(true); setorgdata(org) }}/>
              <p>Donate to {org.name}</p>
              <div className="preAmountDiv">
                <button className="preAmount" onClick={() => handleCustomAmountChange({ target: { value: 5.00 } }, org)}>
                  ${(5.00).toFixed(2)}
                </button>
                <button className="preAmount" onClick={() => handleCustomAmountChange({ target: { value: 10.00 } }, org)}>
                  ${(10.00).toFixed(2)}
                </button>
                <button className="preAmount" onClick={() => handleCustomAmountChange({ target: { value: 20.00 } }, org)}>
                  ${(20.00).toFixed(2)}
                </button>
                <button className="preAmount" onClick={() => handleCustomAmountChange({ target: { value: 50.00 } }, org)}>
                  ${(50.00).toFixed(2)}
                </button>
              </div>
              <div>

                <span>$</span>
                <input
                  type="number"
                  id={org._id}
                  value={customAmounts[org._id] || ''}
                  onChange={(event) => handleCustomAmountChange(event, org)}
                />
                <span>USD</span>
                <button className="button2" onClick={() => setItem(org.name, customAmounts[org._id] * 100, org.description, org._id)}>GiveNow</button>
              </div>
           
            </div>
              ))
          ) : (
          <h1>No Organiation Found</h1>
        )}
        </div>
      )}
      {/* hides pagnation when donate button is clicked */}
      { !showItem && (
      <Pagination itemsPerPage={itemsPerPage} totalItems={organizations.length} paginate={paginate} currentPage={currentPage} category={selectedCategory} />
      )}
    </div>
  );
}
else{
  return(
    <h1>LOADING...</h1>
  )
}
};



export default Organization;