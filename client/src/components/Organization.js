import React, { useState, useEffect } from "react";
import StripeContainer from "../components/StripeContainer";
import { GET_ORGANIZATIONS } from "../utils/queries";
import { useQuery } from '@apollo/client';
import './styles/Organization.css'
import SingleOrg from "./SingleOrg";

const Organization = ({ selectedCategory, setShowItem, showItem, searchQuery}) => {
  const [modalShow, setModalShow] = React.useState(false);

  const [amount, setAmount] = useState(0);
  const [itemName, setItemName] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [OrgID, setOrgID] = useState("");
  const [customAmounts, setCustomAmounts] = useState({}); // State to store custom amounts
  const [orgdata, setorgdata] = useState("");
  const { loading, data, error } = useQuery(GET_ORGANIZATIONS)
   const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  // console.log(data)
  useEffect(() => {
    // Reset currentPage whenever searchQuery changes
    setCurrentPage(1);
  }, [searchQuery]);
  // Function to set both amount, itemName, itemDescription, and OrgID
  const setItem = (name, price, description, orgid) => {
    setShowItem(true);
    setAmount(price);
    setItemName(name);
    setItemDescription(description);
    console.log(orgid,"==== org id here =====")
    setOrgID(orgid);
  };

 
  // Function to handle custom amount input change for a specific organization
  const handleCustomAmountChange = (event, org) => {
    const newCustomAmount = event.target.value;
    // Update the customAmounts dictionary with the custom amount for the specific organization
    setCustomAmounts((prevCustomAmounts) => ({
      ...prevCustomAmounts,
      [org._id]: parseFloat(newCustomAmount),
    }));
  };

  
  if(!loading){
    let organizations = data.organizations;

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
  return (
    <div>
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
              
              <h2>{org.name}</h2>
              <h3>{org.description}</h3>
              <img alt={org.name} src={org.image} onClick={() => { setModalShow(true); setorgdata(org) }}/>
              <h3>Donate to {org.name}</h3>
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
      <Pagination itemsPerPage={itemsPerPage} totalItems={organizations.length} paginate={paginate} currentPage={currentPage} />
    </div>
  );
}
else{
  return(
    <h1>LOADING...</h1>
  )
}
};



const Pagination = ({ itemsPerPage, totalItems, paginate, currentPage }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
            <button onClick={() => paginate(number)} className="page-link">
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Organization;