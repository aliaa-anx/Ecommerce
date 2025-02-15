import {React,useState} from 'react'
import classes from './Register.module.css'
import * as yup from 'yup'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';

import { Button,FloatingLabel,Alert } from "flowbite-react";
import { useFormik } from 'formik'
import { HiInformationCircle } from "react-icons/hi";

export default function Register() {

const navigate=useNavigate();
const [error,setError]=useState(null);
const [isLoading,setIsLoading]=useState(false);













  const initialValues = {
    name: '',
    email: '',
    password: '',
    rePassword: '',
    phone: '',
  }

  async function onSubmit(values){
    console.log("submit",values)
    setIsLoading(true);
    try{
      //call api
       const response=await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup",values);
       console.log("response",response);
      if (response.data.message === "success") {
        console.log("success")
        navigate("/login")
        setError(null)
      }
    }catch(error){
      console.log("error",error.response.data.message)
      setError(error.response.data.message)
    }finally{
      setIsLoading(false);
    }
   
  }

  function validate(values){
    console.log("validate",values)
    let errors = {}
    if(values.name===""){
      errors.name = "Name is required"
    }else if(values.name.length<3){
      errors.name = "Name must be at least 3 characters"
    }else if(values.name.length>15){
      errors.name = "Name must be less than 15 characters"
    }
    //email object
    if(values.email===""){
      errors.email = "Email is required"
    }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)){
      errors.email = "Invalid email address"
    }
    //password object
    if(values.password===""){
      errors.password = "Password is required"
    }else if(values.password.length<8){
      errors.password = "Password must be at least 8 characters"
    }
    if(values.rePassword===""){
      errors.rePassword = "Repassword is required"
    }else if(values.rePassword!==values.password){
      errors.rePassword = "Repassword must be the same as password"
    }
    //phone object
    if(values.phone===""){
      errors.phone = "Phone is required"
    }else if(values.phone.length<11){
      errors.phone = "Phone must be at least 11 characters"
    }
  return errors;
  }

const validationSchema=yup.object().shape({
  name:yup.string().min(3).max(15).required("Name is required"),
  email:yup.string().email("Invalid email address").required("Email is required"),
  password:yup.string().min(8).required("Password is required"),
  rePassword:yup.string().oneOf([yup.ref("password")],"passwords must match").required("Repassword is required"),
  phone:yup.string().min(11).required("Phone is required")
})
  const formik = useFormik({
    initialValues,
    onSubmit,
    //validate,
    validationSchema,
})


  return (

      <section className={classes.Register}>
          <div className='container mx-auto px-3 '>
            <div className='max-w-xl mx-auto'>
            <h2 className='text-2xl font-bold  mb-6'>Register</h2>
            <form onSubmit={formik.handleSubmit}>

              {error && <Alert color="failure" icon={HiInformationCircle}>{error}</Alert>}
            
              {formik.errors.name &&formik.touched.name &&
            <Alert color="failure" icon={HiInformationCircle}>
           {formik.errors.name}
            </Alert>
            }

          <FloatingLabel variant="outlined" label="Name"  type="text" name='name'
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          
            />

            {formik.errors.email &&formik.touched.email &&
            <Alert color="failure" icon={HiInformationCircle}>
           {formik.errors.email}
            </Alert>
            }

          <FloatingLabel variant="outlined" label="Email" type="email" name='email'
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          /> 
          
            {formik.errors.password &&formik.touched.password &&
            <Alert color="failure" icon={HiInformationCircle}>
           {formik.errors.password}
            </Alert>
            } 
        
          <FloatingLabel variant="outlined" label="Password" type="password" name='password'
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          /> 

            {formik.errors.rePassword &&formik.touched.rePassword &&
            <Alert color="failure" icon={HiInformationCircle}>
           {formik.errors.rePassword}
            </Alert>
            }
            
          <FloatingLabel variant="outlined" label="Repassword" type="password" name='rePassword'
          value={formik.values.rePassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          /> 
             
            {formik.errors.phone &&formik.touched.phone && 
            <Alert color="failure" icon={HiInformationCircle}>
           {formik.errors.phone}
            </Alert>
            }
            
          <FloatingLabel variant="outlined" label="phone" type="tel" name='phone'
          value={formik.values.phone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
            />

          <Button  disabled={!(formik.isValid && formik.dirty||isLoading)} type='submit' >
            {isLoading ?(
            <i className='fa fa-spinner fa-spin'></i>)
            :("Register")
            }</Button>
            </form>
            </div>

          </div>
        </section>

  )
}
