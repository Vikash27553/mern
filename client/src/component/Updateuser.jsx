import React from 'react'
import {useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { useParams } from "react-router-dom";
import { useEffect } from 'react';
// import { use } from 'react';


function Updateuser() {

  //state to hold form data from field

   const userData ={
    name:'',
    email:'',
    address:''
   };
   const {id} = useParams();
   console.log(id);


   const [user ,setUser] = useState(userData);
   const navigate = useNavigate();

   const inputHandler =(e) =>{
      const  {name , value } = e.target;
      console.log(name , value);
      setUser({...user,[name]: value});

    

      

   }

    useEffect(()=>{
          axios.get(`http://localhost:9000/api/userid/${id}`)
               .then(res =>setUser(res.data))
               .catch(err => console.log(err));
        
    },[id] )

   const submitForm = async (e)=>{
        e.preventDefault();
         await axios.put(`http://localhost:9000/api/update/user/${id}`, user)
         .then(res => {
            toast.success(res.data.message, { position: "top-right"});
             navigate('/');
         })
         .catch(err => console.log(err));

      }
  return (
    <>
      <Link  to ="/" type="button" className="btn btn-primary bg-yellow m-2">
        <i className="fa-solid fa-backward w-50 p-2 "> Back</i> </Link>
      <h2>Update Details</h2>
      <form  onSubmit={submitForm} method="post" >
        {/* Name Input */}
        <label htmlFor="name">Name:</label><br />
        <input type="text" id="name"  value={user.name} name="name" required  onChange={inputHandler}/><br /><br />

        {/* Password Input */}
        <label htmlFor="email">email:</label><br />
        <input type="email" id="email"  value={user.email} name="email" required  onChange={inputHandler} /><br /><br />

        {/* Address Input */}
        <label htmlFor="address">Address:</label><br />
        <textarea id="address" name="address"  value= {user.address} onChange={inputHandler} rows="2" cols="25" required></textarea><br /><br />

        {/* Submit Button */}
        <button type="submit">Submit</button>
      </form>
    </>
  )
}

export default Updateuser
