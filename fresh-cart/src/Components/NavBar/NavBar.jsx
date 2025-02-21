import React from 'react'
import classes from './NavBar.module.css'
import { Button, Navbar } from "flowbite-react";
import { Link } from 'react-router-dom'
import { AuthContext } from '../../Context/AuthContext';
import { useContext } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
export default function NavBar() {
  const { authToken, setAuthToken } = useContext(AuthContext);
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("authToken");
    setAuthToken(null);
    navigate('/login');
  }
  return (

    <>

      <Navbar fluid rounded className='my-10'>
        <Navbar.Brand as={Link} href="https://flowbite-react.com">

          <span className=" self-start whitespace-nowrap text-xl font-semibold dark:text-white ">Fresh Cart</span>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>

          {
            authToken ? (<>
              <Navbar.Link href="#" active>
                Home
              </Navbar.Link>

              <Navbar.Link href="/products">Products</Navbar.Link>
              <Navbar.Link href="/brands">Brands</Navbar.Link>
              <Navbar.Link href="/categories">Categories</Navbar.Link>

              <Navbar.Link onClick={handleLogout}>Logout</Navbar.Link>
              <Navbar.Link href="/profile">Profile</Navbar.Link>
            </>) : (<>
              <Navbar.Link href="/login">Login</Navbar.Link>
              <Navbar.Link href="/register">Register</Navbar.Link>
            </>)
          }





        </Navbar.Collapse>
      </Navbar>

    </>
  )
}
