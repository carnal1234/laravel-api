import {useEffect, useState} from "react";
import axiosClient from "../axios-client.js";
import {Link} from "react-router-dom";
import {useStateContext} from "../context/ContextProvider.jsx";
// import { useLocation } from 'react-router-dom';

import { useSearchParams } from "react-router-dom";





export default function Users() {
  const [users, setUsers] = useState([]);
  const [paginatedLinks, setPaginatedLinks] = useState({});
  const [loading, setLoading] = useState(false);

  

  



  const config = {      
    baseURL: import.meta.env.VITE_FRONTEND_BASE_URL,
  }

  const {setNotification} = useStateContext()

  useEffect(() => {
    getUsers("/users");
  }, [])

  const onDeleteClick = user => {
    if (!window.confirm("Are you sure you want to delete this user?")) {
      return
    }
    axiosClient.delete(`/users/${user.id}`)
      .then(() => {
        setNotification('User was successfully deleted')
        getUsers()
      })
  }

  const generatePageLink = (pageNumber)=>{
    return `${config.baseURL}/users?page=${pageNumber}`
  };

  const getUsers = (url) => {

    if(!url) return;

    setLoading(true)
    // let pageNumber = searchParams.get('page');
    // pageNumber = pageNumber ? parseInt(pageNumber): null;
    // let targetURL = pageNumber ? `/users?page=${pageNumber}` : '/users'
    // console.log("Fetch", targetURL)
    axiosClient.get(url)
      .then(({ data }) => {
        // console.log("user data" ,data)

        
        setLoading(false)
        setUsers(data.data)
        setPaginatedLinks(data.links)
        // console.log(data.links, paginatedLinks)
        // setPaginatedLinks({
        //   prev: pageNumber > 1 ? generatePageLink(pageNumber - 1): null,
        //   current: generatePageLink(pageNumber),
        //   next: generatePageLink(pageNumber + 1)
        // })

        // let baseUrl = `${import.meta.env.VITE_FRONTEND_BASE_URL}/api`

       
        

        
      })
      .catch(() => {
        setLoading(false)
      })
  }

  const HandlePreviousPage = () => {
   
    
    getUsers(paginatedLinks.prev);
  }
  const HandleNextPage = () => {
   
    getUsers(paginatedLinks.next);
  }

  return (
    <div>
      <div style={{display: 'flex', justifyContent: "space-between", alignItems: "center"}}>
        <h1>Users</h1>
        {paginatedLinks.prev ? <button className="btn-add" onClick={HandlePreviousPage}>Previous</button> : null }
        <Link className="btn-add" to="/users/new">Add new</Link>
        {paginatedLinks.next ? <button className="btn-add"  onClick={HandleNextPage}>Next</button>  : null }
      </div>
      <div className="card animated fadeInDown">
        <table>
          <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Create Date</th>
            <th>Actions</th>
          </tr>
          </thead>
          {loading &&
            <tbody>
            <tr>
              <td colSpan="5" class="text-center">
                Loading...
              </td>
            </tr>
            </tbody>
          }
          {!loading &&
            <tbody>
            {users.map(u => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.created_at}</td>
                <td>
                  <Link className="btn-edit" to={'/users/' + u.id}>Edit</Link>
                  &nbsp;
                  <button className="btn-delete" onClick={ev => onDeleteClick(u)}>Delete</button>
                </td>
              </tr>
            ))}
            </tbody>
          }
        </table>
      </div>
    </div>
  )
}
