import React from 'react';
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


return(
    <div class="p-5 text-center bg-image rounded-3" style={styles.background}>
  <div class="mask" style={styles.styles}>
    <div class="d-flex justify-content-center align-items-center h-100">
      <div class="text-white">
        <h1 class="mb-3">Join Us in Making a Difference Through Compassionate Giving</h1>
        <h4 class="mb-3">Find and support a charity that aligns with your passions.</h4>
        <a class="btn btn-outline-light btn-lg" href="/donate" role="button">GiveNow</a>
      </div>
    </div>
  </div>
</div>
)




}
export default Home;