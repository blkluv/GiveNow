import React from "react";

//Pagnation component

const Pagination = ({ itemsPerPage, totalItems, paginate, currentPage }) => {

    const pagStyle = {
  
        display: 'flex',
        justifyContent: 'center'
      
    }
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
      pageNumbers.push(i);
    }
  
    const handlePreviousClick = () => {
      if (currentPage > 1) {
        paginate(currentPage - 1);
      }
      window.scrollTo(0, 100)
    };
  
    const handleNextClick = () => {
      if (currentPage < Math.ceil(totalItems / itemsPerPage)) {
        paginate(currentPage + 1);
      }
      window.scrollTo(0, 100)
    };
  
    return (
      <div style={pagStyle}>
      <nav>
        <ul className="pagination">
          <li className="page-item">
            <button onClick={handlePreviousClick} className="page-link" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </button>
          </li>
          {pageNumbers.map((number) => (
            <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
              <button onClick={() => { paginate(number); window.scrollTo(0, 100); }} className="page-link">
  {number}
</button>
            </li>
          ))}
          <li className="page-item">
            <button onClick={handleNextClick} className="page-link" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </button>
          </li>
        </ul>
      </nav>
      </div>
    );
  };
  export default Pagination