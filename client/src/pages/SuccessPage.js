import React from 'react';
import Wrongpage from './404page';
const SuccessPage = (Sucprops) => {
  console.log(Sucprops, "kai kai kai");

  if (Object.keys(Sucprops).length === 0) {
    return <Wrongpage/>
  } else {
    return (
      // TODO add back to home page button or make another Donation button. Reset state or reload?
      <div>
        <h2>
          You Just Donated {((Sucprops.Sucprops.amount || 0) / 100).toFixed(2)}$ to{' '}
          {Sucprops.Sucprops.itemName} thank you so much!
        </h2>
      </div>
    );
  }
};

export default SuccessPage;
