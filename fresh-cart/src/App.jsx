import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'
import { Routes, Route, createBrowserRouter } from 'react-router-dom'
import { RouterProvider } from 'react-router-dom'
import Home from './Components/Home/Home'
import Layout from './Components/Layout/Layout'
import Products from './Components/Products/Products'
import Cart from './Components/Cart/Cart'
import Brands from './Components/Brands/Brands'
import Categories from './Components/Categories/Categories'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import Error from './Components/Error/Error'
import NotFound from './Components/NotFound/NotFound'
import { Button } from "flowbite-react";
const router = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    errorElement: < Error/>,
    children: [
      {
        path: "true",
        element: <Home />
      },
      {
        path: "products",
        element: <Products />
      },
      {
        path: "cart",
        element: <Cart />
      },
      {
        path: "Brands",
        element: <Brands />
      },
      {
        path: "Categories",
        element: <Categories />
      },
      {
        path: "Login",
        element: <Login />
      },
      {
        path: "Register",
        element: <Register />
      },
      {
        path: "*",
        element: <NotFound />
      }

      
      

    ]
  }
])




function App() {
  return (
    <div>
      <RouterProvider router={router} />
      
    </div>
  )
}

export default App;