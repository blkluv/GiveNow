import React from 'react';
import Wrongpage from './404page';

const SuccessPage = (Sucprops) => {
  // console.log(Sucprops, "kai kai kai");
  const reload = () => {
    window.location.reload()
  }
  const styles = {
    div:{
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
      alignItems: 'center',
      margin: '5%'
    },
    button: {
      
        display: "block",
        fontSize: "16px",
        
        height: "40px",
        backgroundColor: "#3871C1",
        boxShadow: "0 6px 9px rgba(50, 50, 93, 0.06), 0 2px 5px rgba(0, 0, 0, 0.08)",
        borderRadius: "4px",
        color: "#fff",
        fontWeight: "600",
        cursor: "pointer",
        transition: "all 100ms ease-in-out",
        willChange: "transform, background-color, box-shadow",
        border: "none"
      },
      p :{
        marginTop: '4%',
        justifySelf: "flex-end"
      }

    
  }
  if (Object.keys(Sucprops).length === 0) {
    return <Wrongpage/>
  } else {
    return (
      // TODO add back to home page button or make another Donation button. Reset state or reload?
      <div style={styles.div}>
        <h2>
          You Just Donated {((Sucprops.Sucprops.amount || 0) / 100).toFixed(2)}$ to{' '}
          {Sucprops.Sucprops.itemName} thank you so much!
        </h2>
        
        
        <button style={styles.button} onClick={reload}>Make another donation?</button>
        
  <p style={styles.p}>back to home page <a href='/'>click</a></p>
      </div>
    );
  }
};

export default SuccessPage;
