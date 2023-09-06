import React from 'react';
import auth from '../utils/auth';
import { GET_ME } from '../utils/queries'
import { useQuery } from "@apollo/client";

const MyDonations= () => {
    const { loading, data } = useQuery(GET_ME);
if(auth.loggedIn()){

console.log(data,"data")
return(
    <div>
    <h1>My donations </h1>
{/* <div>
    <h2>userinfo</h2>
    <p>username: {data.me.username}</p>
    <p>email: {data.me.email}</p>
    <p>topdoner: {data.me.topdoner}</p>
</div>
<div>
    <h2>Donations</h2>
    <p>{data.me.donations}</p>
</div> */}
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
export default MyDonations;