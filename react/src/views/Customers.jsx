import {useEffect, useState} from "react";
import axiosClient from "../axios-client.js";
import {Link} from "react-router-dom";
import {useStateContext} from "../context/ContextProvider.jsx";





export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [paginatedLinks, setPaginatedLinks] = useState({});
  const [loading, setLoading] = useState(false);

  

  



  const config = {      
    baseURL: import.meta.env.VITE_FRONTEND_BASE_URL,
  }

  const {setNotification} = useStateContext()

  useEffect(() => {
    getCustomers("v1/customers");
  }, [])

  const onDeleteClick = customer => {
    if (!window.confirm("Are you sure you want to delete this user?")) {
      return
    }
    axiosClient.delete(`v1/customers/${customer.id}`)
      .then(() => {
        setNotification('Customer was successfully deleted')
        getCustomers()
      })
  }

  const getCustomers = (url) => {

    if(!url){
      return;
    }

    setLoading(true)
    
    axiosClient.get(url)
      .then(({ data }) => {
        console.log("user data" ,data)

        
        setLoading(false)
        setCustomers(data.data)
        setPaginatedLinks(data.links)
        
      })
      .catch(() => {
        setLoading(false)
      })
  }

  const HandlePreviousPage = () => {
   
    
    getCustomers(paginatedLinks.prev);
  }
  const HandleNextPage = () => {
   
    getCustomers(paginatedLinks.next);
  }

  return (
    <div>
      <div style={{display: 'flex', justifyContent: "space-between", alignItems: "center"}}>
        <h1>Customers</h1>
        {paginatedLinks.prev ? <button className="btn-add" onClick={HandlePreviousPage}>Previous</button> : null }
        <Link className="btn-add" to="/customers/new">Add new</Link>
        {paginatedLinks.next ? <button className="btn-add"  onClick={HandleNextPage}>Next</button>  : null }
      </div>
      <div className="card animated fadeInDown">
        <table>
          <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Type</th>
            <th>Email</th>
            {/* <th>address</th>
            <th>city</th> */}
            <th>State</th>
            {/* <th>postalCode</th> */}
            {/* <th>Create Date</th> */}
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
            {customers.map(customer => (
              <tr key={customer.id}>
                <td>{customer.id}</td>
                <td>{customer.name}</td>
                <td>{customer.type === "I" ? "Normal" : "Business"}</td>
                <td>{customer.email}</td>
                {/* <td>{customer.address}</td>
                <td>{customer.city}</td> */}
                <td>{customer.state}</td>
                {/* <td>{customer.postalCode}</td> */}
                {/* <td>{u.created_at}</td> */}
                <td>
                  <Link className="btn-edit" to={'/customers/' + customer.id}>Edit</Link>
                  &nbsp;
                  <button className="btn-delete" onClick={ev => onDeleteClick(customer)}>Delete</button>
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
