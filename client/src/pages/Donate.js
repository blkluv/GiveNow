import React, { useState } from 'react';
import Organization from '../components/Organization';
import '../components/styles/Donate.css'
const Donate = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const filterOrganizationsByCategory = (category) => {
    setSelectedCategory(category);
  };
// if show item is true dont display category buttons
  const [showItem, setShowItem] = useState(false);
  return (
    <div className="DonateDiv">
      <h1 className='donateh1'>Donate</h1>
   
      {!showItem && (
        <>
          <h3 className='donateh1'>Categories</h3>
        <div className='CatDiv'>
         
          <button onClick={() => filterOrganizationsByCategory(null)}>All</button>
          <button onClick={() => filterOrganizationsByCategory("Disaster Relief")}>Disaster Relief</button>
          <button onClick={() => filterOrganizationsByCategory("Healthcare")}>Healthcare</button>
          <button onClick={() => filterOrganizationsByCategory("Education")}>Education</button>
          <button onClick={() => filterOrganizationsByCategory("Animal Welfare")}>Animal Welfare</button>
          <button onClick={() => filterOrganizationsByCategory("Environmental")}>Environmental</button>
        </div>
        </>
      )}
      <Organization selectedCategory={selectedCategory} setShowItem={setShowItem} showItem={showItem} />
    </div>
  );
};

export default Donate;
