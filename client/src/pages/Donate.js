import React, { useState } from 'react';
import Organization from '../components/Organization';
import '../components/styles/Donate.css'
import Dropdown from 'react-bootstrap/Dropdown';
const Donate = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const filterOrganizationsByCategory = (category) => {
    setSelectedCategory(category);
  };
  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
    console.log(searchQuery,"search change")
  };
// if show item is true dont display category buttons
  const [showItem, setShowItem] = useState(false);
  return (
    <div className="DonateDiv">
      <h1 className='donateh1'>Donate</h1>
      {!showItem && (
        <>
          {/* <h3 className='donateh1'>Sort by categories:</h3> */}
          <div className='inputdiv'>
          <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Sort by Category
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={() => filterOrganizationsByCategory(null)}>All</Dropdown.Item>
        <Dropdown.Item onClick={() => filterOrganizationsByCategory("Disaster Relief")}>Disaster Relief</Dropdown.Item>
        <Dropdown.Item onClick={() => filterOrganizationsByCategory("Healthcare")}>Healthcare</Dropdown.Item>
        <Dropdown.Item onClick={() => filterOrganizationsByCategory("Education")}>Education</Dropdown.Item>
        <Dropdown.Item onClick={() => filterOrganizationsByCategory("Animal Welfare")}>Animal Welfare</Dropdown.Item>
        <Dropdown.Item onClick={() => filterOrganizationsByCategory("Environmental")}>Environmental</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
      <input type="text" id="myInput" value={searchQuery} onChange={handleSearchInputChange}  placeholder="Search for org by name" title="Type in a name"></input>
      </div>
        </>
      )}
      <Organization selectedCategory={selectedCategory} setShowItem={setShowItem} showItem={showItem} />
    </div>
  );
};

export default Donate;
