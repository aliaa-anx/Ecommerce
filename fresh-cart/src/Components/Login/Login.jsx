import { React, useState } from 'react'
import classes from './Login.module.css'
import * as yup from 'yup'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';

import { Button, FloatingLabel, Alert } from "flowbite-react";
import { useFormik } from 'formik'
import { HiInformationCircle } from "react-icons/hi";
import { AuthContext } from '../../Context/AuthContext';
import { useContext } from 'react';
export default function Login() {
  const { setAuthToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);













  const initialValues = {
    name: '',
    email: '',
    password: '',
    rePassword: '',
    phone: '',
  }

  async function onSubmit(values) {
    console.log("submit", values)
    setIsLoading(true);
    try {
      //call api
      const response = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin", values);
      console.log("response", response);
      if (response.data.message === "success") {
        console.log("success")
        setAuthToken(response.data.token);
        localStorage.setItem("authToken", response.data.token);
        navigate("/")
        setError(null)
      }
    } catch (error) {
      console.log("error", error.response.data.message)
      setError(error.response.data.message)
    } finally {
      setIsLoading(false);
    }

  }

  function validate(values) {
    console.log("validate", values)
    let errors = {}
    
    //email object
    if (values.email === "") {
      errors.email = "Email is required"
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = "Invalid email address"
    }
    //password object
    if (values.password === "") {
      errors.password = "Password is required"
    } else if (values.password.length < 8) {
      errors.password = "Password must be at least 8 characters"
    }
   
    return errors;
  }

  const validationSchema = yup.object().shape({
    
    email: yup.string().email("Invalid email address").required("Email is required"),
    password: yup.string().min(8).required("Password is required"),
    
  })
  const formik = useFormik({
    initialValues,
    onSubmit,
    //validate,
    validationSchema,
  })


  return (

    <section className={classes.Login}>
      <div className='container mx-auto px-3 '>
        <div className='max-w-xl mx-auto'>
          <h2 className='text-2xl font-bold  mb-6'>Login</h2>
          <form onSubmit={formik.handleSubmit}>

            {error && <Alert color="failure" icon={HiInformationCircle}>{error}</Alert>}

            

            

            {formik.errors.email && formik.touched.email &&
              <Alert color="failure" icon={HiInformationCircle}>
                {formik.errors.email}
              </Alert>
            }

            <FloatingLabel variant="outlined" label="Email" type="email" name='email'
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />

            {formik.errors.password && formik.touched.password &&
              <Alert color="failure" icon={HiInformationCircle}>
                {formik.errors.password}
              </Alert>
            }

            <FloatingLabel variant="outlined" label="Password" type="password" name='password'
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />

            

            <Button disabled={!(formik.isValid && formik.dirty || isLoading)} type='submit' >
              {isLoading ? (
                <i className='fa fa-spinner fa-spin'></i>)
                : ("Login")
              }</Button>
          </form>
        </div>

      </div>
    </section>

  )
}

