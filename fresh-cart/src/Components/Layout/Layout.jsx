import React from 'react'
import classes from './Layout.module.css'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { Outlet } from 'react-router-dom'
export default function Layout() {

  return (

      <section className={classes.Layout}>
          <div className='container mx-auto px-3 '>
            <Navbar />
            <Outlet />
            <Footer />
          </div>
        </section>

  )
}
