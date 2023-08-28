import React from 'react';
import auth from '../utils/auth';


const MyDonattions= () => {

if(auth.loggedIn()){


return(
    <div>
    <h1>My donations </h1>

    </div>
)
}
else{
    return(
        <div>
        <h1>Need to log in </h1>
    
        </div>
    )

}



}
export default MyDonattions;