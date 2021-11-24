import React, { useState, useEffect } from 'react';
import axios from 'axios'

function Profile() {
    const[data, setData] = useState({stamina : null,});

    useEffect(() => {
        axios.get('http://localhost:3000/api/character/1').then((res) => {
            console.log(res.data)
            setData(res.data)
            
        }).catch(err =>{
        console.log(err)
    });
    }, 
    []);
    return(
        <div>test from profile </div>
    );
}
export default Profile;