import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axiosClient from "../axios-client.js";
import {useStateContext} from "../context/ContextProvider.jsx";


/*
"id": 230,
"name": "Kassandra Grady",
"type": "I",
"email": "summer31@runolfsdottir.com",
"address": "7020 Stehr Track",
"city": "Sadyefort",
"state": "Pennsylvania",
"postalCode": "05895-0534"

*/

export default function CustomerForm() {
  const navigate = useNavigate();
  let {id} = useParams();
  const [customer, setCustomer] = useState({
    id: null,
    name: '',
    type: '',
    email: '',
    address: "",
    city: "",
    state: "",
    postalCode: ""
  })
  
  const [errors, setErrors] = useState(null)
  const [loading, setLoading] = useState(false)
  const {setNotification} = useStateContext()

  if (id) {
    useEffect(() => {
      setLoading(true)
      axiosClient.get(`/v1/customers/${id}`)
        .then(({data}) => {
          setLoading(false)
          setCustomer(data.data)
        })
        .catch(() => {
          setLoading(false)
        })
    }, [])
  }

  const onSubmit = ev => {
    ev.preventDefault()
    if (customer.id) {
      axiosClient.put(`/v1/customers/${customer.id}`, customer)
        .then(() => {
          setNotification('customer was successfully updated')
          navigate('/customers')
        })
        .catch(err => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors)
          }
        })
    } else {
      axiosClient.post('/v1/customers', customer)
        .then(() => {
          setNotification('customer was successfully created')
          navigate('/customers')
        })
        .catch(err => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors)
          }
        })
    }
  }

  return (
    <>
      {customer.id && <h1>Update customer: {customer.name}</h1>}
      {!customer.id && <h1>New customer</h1>}
      <div className="card animated fadeInDown">
        {loading && (
          <div className="text-center">
            Loading...
          </div>
        )}
        {errors &&
          <div className="alert">
            {Object.keys(errors).map(key => (
              <p key={key}>{errors[key][0]}</p>
            ))}
          </div>
        }
        {!loading && (
          <form onSubmit={onSubmit}>
            {/* <label for="customerName">Do you like cheese?</label> */}
            <input name="customerName" value={customer.name} onChange={ev => setCustomer({...customer, name: ev.target.value})} placeholder="Name"/>
            <select name="customerType" id="customerType-select" onChange={ev => setCustomer({...customer, type: ev.target.value})}>
              <option value="I">Normal</option>
              <option value="B">Business</option>
            </select>
            <input type="email" value={customer.email} onChange={ev => setCustomer({...customer, email: ev.target.value})} placeholder="Email"/>
            <input value={customer.address} onChange={ev => setCustomer({...customer, address: ev.target.value})} placeholder="Address"/>
            <input value={customer.city} onChange={ev => setCustomer({...customer, city: ev.target.value})} placeholder="City"/>
            <input value={customer.state} onChange={ev => setCustomer({...customer, state: ev.target.value})} placeholder="State"/>
            <input value={customer.postalCode} onChange={ev => setCustomer({...customer, postalCode: ev.target.value})} placeholder="PostalCode"/>
            
            
            
            {/* <input type="password" onChange={ev => setCustomer({...customer, password: ev.target.value})} placeholder="Password"/>
            <input type="password" onChange={ev => setCustomer({...customer, password_confirmation: ev.target.value})} placeholder="Password Confirmation"/> */}
            <button className="btn">Save</button>
          </form>
        )}
      </div>
    </>
  )
}
