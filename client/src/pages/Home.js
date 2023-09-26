import React, {useState} from 'react';
import Carousel from 'react-bootstrap/Carousel';
import ExampleCarouselImage from '../components/styles/topdonor.png';
import { GET_ORGANIZATIONS } from "../utils/queries";
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
const styles = {
    styles: {
        backgroundColor: "rgba(0, 0, 0, 0.6)"
    },
    background: {
        backgroundImage: "url('https://mdbcdn.b-cdn.net/img/new/slides/041.webp')",
    height: "50vh",
    backgroundSize: "cover", 
    backgroundRepeat: "no-repeat",
    },
    Carouselconatiner: {
      width: '50%',
    
    },
    dasha: {
      display: 'flex',
      
      flexDirection: 'column',
      alignItems: 'center'
    },
    dasha2: {
      display: 'flex',
      
      flexDirection: 'column',
      alignItems: 'flex-end'
    },
}
const Home = () => {
  const { loading, data, error } = useQuery(GET_ORGANIZATIONS)
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };
  let top3DonatedOrganizations = 0;
  if(!loading){
    let organizations = [...data.organizations]; // Create a copy of the array
console.log(organizations)
    const sortedOrganizations = organizations.sort((a, b) => b.donationsmade - a.donationsmade);
    top3DonatedOrganizations = sortedOrganizations.slice(0, 3);
  }
return(
  <div >
    <div className="p-5 text-center bg-image rounded-3" style={styles.background}>
  <div className="mask" style={styles.styles}>
    <div className="d-flex justify-content-center align-items-center h-100">
      <div className="text-white">
        <h1 className ="mb-3">Join Us in Making a Difference Through Compassionate Giving</h1>
        <h4 className="mb-3">Find and support a charity that aligns with your passions.</h4>
        <a className="btn btn-outline-light btn-lg" href="/donate" role="button">GiveNow</a>
      </div>
    </div>
  </div>
</div>
<div style={styles.dasha}>
  Promoted Charitys
  <div style={styles.Carouselconatiner}>
    {/* TODO hard code promoted? Add query to get most popular */}
  <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
      <Link to='/singleorg/650ca9e582c5da1b8ea5b180'>
      <img
              className="d-block w-100"
              src={ExampleCarouselImage}
              alt="First slide"
            />
              </Link>
      
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <img
              className="d-block w-100"
              src={ExampleCarouselImage}
              alt="First slide"
            />
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <img
              className="d-block w-100"
              src={ExampleCarouselImage}
              alt="First slide"
            />
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    </div>
</div>
<div style={styles.dasha}>
  Popular charitys
  {loading? <p>loading popular charitys...</p> :
 
  <div style={styles.Carouselconatiner}>
   <Carousel>
              {top3DonatedOrganizations.map((org, idx) => (
                <Carousel.Item key={idx}>
                  <Link to={`/singleorg/${org._id}`}>
                    <img className="d-block w-100" src={org.image} alt={`Slide ${idx + 1}`} />
                  </Link>
                  <Carousel.Caption>
                    <h3>{org.name}</h3>
                    <p>{org.description}</p>
                    {/*TODO Add button functionality?! */}
                    <button>GiveNow</button>
                  </Carousel.Caption>
            
                
                </Carousel.Item>
              ))}
            </Carousel>
    </div>
}
</div>
</div>

)
  





}
export default Home;