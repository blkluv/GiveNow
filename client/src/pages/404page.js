import React from 'react';

const Wrongpage = () => {
 const styles = {
  div:{
display: 'flex',
justifyContent: 'center',
flexDirection: 'column',
alignItems: 'center',
margin: '5%'
  },
h2:{
  textAlign: 'center'
}

 }

    return (
      <div style={styles.div}>
        <h2 style={styles.h2}>
        Oops! Wrong page?
        
        </h2>
        <a href="/">Back to home</a>
      </div>
    );
  
};

export default Wrongpage;