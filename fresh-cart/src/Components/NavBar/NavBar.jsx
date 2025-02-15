import React from 'react'
import classes from './NavBar.module.css'
import { Button, Navbar } from "flowbite-react";
import { Link } from 'react-router-dom'
export default function NavBar() {

  return (

      <>
            
        <Navbar fluid rounded className='my-10'>
          <Navbar.Brand as={Link} href="https://flowbite-react.com">
            
            <span className=" self-start whitespace-nowrap text-xl font-semibold dark:text-white ">Fresh Cart</span>
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Navbar.Link href="#" active>
              Home
            </Navbar.Link>
            
            <Navbar.Link href="/products">Products</Navbar.Link>
            <Navbar.Link href="/brands">Brands</Navbar.Link>
            <Navbar.Link href="/categories">Categories</Navbar.Link>
            <Navbar.Link href="/login">Login</Navbar.Link>
            <Navbar.Link href="/register">Register</Navbar.Link>
            <Navbar.Link href="/logout">Logout</Navbar.Link>
            <Navbar.Link href="/profile">Profile</Navbar.Link>
          </Navbar.Collapse>
        </Navbar>
          
    </>
  )
}
