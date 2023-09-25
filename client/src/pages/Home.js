import React, {useState} from 'react';
import Carousel from 'react-bootstrap/Carousel';
import ExampleCarouselImage from '../components/styles/topdonor.png';
const styles = {
    styles: {
        backgroundColor: "rgba(0, 0, 0, 0.6)"
    },
    background: {
        backgroundImage: "url('https://mdbcdn.b-cdn.net/img/new/slides/041.webp')",
    height: "50vh",
    backgroundSize: "cover", 
    backgroundRepeat: "no-repeat",
    }
}
const Home = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

return(
  <div>
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
<div>
  Where you can GiveNow
  <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
      <img
              className="d-block w-100"
              src={ExampleCarouselImage}
              alt="First slide"
            />
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
<div>
  Popular charitys
  <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
      <img
              className="d-block w-100"
              src={ExampleCarouselImage}
              alt="First slide"
            />
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
)




}
export default Home;