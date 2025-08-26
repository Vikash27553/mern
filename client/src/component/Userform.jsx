import React from 'react'
import {useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

function Userform() {

  //state to hold form data from field

   const userData ={
    name:'',
    email:'',
    address:''
   };


   const [user ,setUser] = useState(userData);
   const navigate = useNavigate();

   const inputHandler =(e) =>{
      const  {name , value } = e.target;
      console.log(name , value);
      setUser({...user,[name]: value});

      

   }

   const submitForm = async (e)=>{
        e.preventDefault();
         await axios.post('http://localhost:9000/api/user', user)
         .then(res => {
            toast.success(res.data.message, { position: "top-right"});
             navigate('/');
         })
         .catch(err => console.log(err));

      }
  return (
    <>
      <h2>Registration Form</h2>
      <form  onSubmit={submitForm} method="post" >
        {/* Name Input */}
        <label htmlFor="name">Name:</label><br />
        <input type="text" id="name" name="name" required  onChange={inputHandler}/><br /><br />

        {/* Password Input */}
        <label htmlFor="email">email:</label><br />
        <input type="email" id="email" name="email" required  onChange={inputHandler} /><br /><br />

        {/* Address Input */}
        <label htmlFor="address">Address:</label><br />
        <textarea id="address" name="address"  onChange={inputHandler} rows="2" cols="25" required></textarea><br /><br />

        {/* Submit Button */}
        <button type="submit">Submit</button>
      </form>
    </>
  )
}

export default Userform
