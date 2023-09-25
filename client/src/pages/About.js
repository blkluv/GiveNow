import React from 'react';

const About = () => {
 const styles = {
  h1:{
    textAlign: 'center',
    paddingTop: '1%'
  },
  p:{
    textAlign: 'center',

  }
 }

    return (
      <div>
        <h1 style={styles.h1}>About</h1>
        <p style={styles.p}>GiveNow facilitates and empowers millions of individuals to make a meaningful impact and contribute to the causes close to their hearts. </p>
        <div>
          youtube video?
        </div>
      </div>
    );
  
};

export default About;