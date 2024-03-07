import {createBrowserRouter, Navigate} from "react-router-dom";
import Dashboard from "./Dashboard.jsx";
import DefaultLayout from "./components/DefaultLayout";
import GuestLayout from "./components/GuestLayout";
import Login from "./views/Login";
import NotFound from "./views/NotFound";
import Signup from "./views/Signup";


import Customers from "./views/Customers";
import CustomerForm from "./views/CustomerForm.jsx"; 

const router = createBrowserRouter([
  {
    path: '/',
    element: <DefaultLayout/>,
    children: [
      {
        path: '/',
        element: <Navigate to="/customers"/>
      },
      {
        path: '/dashboard',
        element: <Dashboard/>
      },
      {
        path: '/customers',
        element: <Customers/>
      },
      {
        path: '/customers/new',
        element: <CustomerForm key="customerCreate" />
      },
      {
        path: '/customers/:id',
        element: <CustomerForm key="customerUpdate" />
      }
    ]
  },
  {
    path: '/',
    element: <GuestLayout/>,
    children: [
      {
        path: '/login',
        element: <Login/>
      },
      {
        path: '/signup',
        element: <Signup/>
      }
    ]
  },
  {
    path: "*",
    element: <NotFound/>
  }
])

export default router;
