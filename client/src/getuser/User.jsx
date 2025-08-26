import  { useState,useEffect } from 'react'
import './user.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

function User(){

  const [user ,setUser] = useState([]);
  useEffect(()=>{
    const fetchData= async ()=>{
      try {
        const resdataget = await axios.get('http://localhost:9000/api/users')
        setUser(resdataget.data)
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
    fetchData();
  },[])
     
  return (
    <div  className='userTable'  >
      <Link  to ="/adduser" type="button" className="btn btn-primary">Add-User
        <i className="fa-solid fa-user-plus"></i>
      </Link>
        <table className='table table-bordered'>
          <thead>
            <tr>
              <th scope='col'>s.no  </th>
              <th scope='col'>Name  </th>
              <th scope='col'>Email  </th>
              <th scope='col'>Address  </th>
              <th scope='col'>Action  </th>
            </tr>
          </thead>
          <tbody> 
            {user.map((user, index) => {
              return(
                <tr key={user._id}>
                  <th scope='row'>{index + 1}</th>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.address}</td>
                  <td>
            <Link to ={`/update/${user._id}`} className='btn btn-success'>Update</Link>
                    <button  onClick={()=>{
                      axios.delete(`http://localhost:9000/api/delete/${user._id}`)
                      .then(res => {
                        toast.success(res.data.message, { position: "top-right"});
                        // alert(res.data.message);
                        window.location.reload();
                      })
                      .catch(err => console.log(err));
                    }}
                    className='btn btn-danger'>Delete</button>
                  </td>
                </tr>
              )
            }
        )}
            
          </tbody>
        </table>
      
    </div>
  )
}

export default User;


