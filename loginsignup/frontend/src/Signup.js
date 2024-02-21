import {Link} from 'react-router-dom'
import React, { useState } from 'react'
import Validation from './SignupValidation'  


function Signup() {
    const[values , setValues] = useState({
        name:'',
        email:'',
        password:''
      })
      const [errors , setErrors] = useState({})
    const handleInput = (event) => {
        setValues({...values,[event.target.name]:event.target.value})
    }
      const handleSubmit = (event) => {
        event.preventDefault()
        setErrors(Validation(values));
      }

  return (
    <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
        <div className='bg-white p5 rounded w-50'>
            <h2>Sign-Up</h2>
            <form action ="" onSubmit={handleSubmit}>
                <div className='mb-3'>
                   <label htmlFor='name'><strong>Name</strong></label>
                   <input type="text" placeholder='Enter Name' name='email'  
                   onChange={handleInput} className='form-control rounded-0' required/>
                   {errors.name && <span className='text-danger'> {errors.name}</span>}
                 </div>
                 <div className='mb-3'>
                   <label htmlFor='email'><strong>Email</strong></label>
                   <input type="email" placeholder='Enter Email' name='email'  
                   onChange={handleInput} className='form-control rounded-0' required/>
                  {errors.email && <span className='text-danger'> {errors.email}</span>}
                 </div>
                 <div className='mb=3'>
                    <label htmlFor='password'><strong>Password</strong></label>
                    <input type="password" placeholder='Enter password' name='password' 
                    onChange={handleInput} className='form-control rounded-0'required/>
                    {errors.password && <span className='text-danger'> {errors.password}</span>}
                 </div>
                 <button type = 'submit' className='btn btn-success w-100 rounded-0'><strong>SIgn up</strong></button>
                 <p> You agree to our terms and conditions</p>
                 <Link to ="/"className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Login</Link>
            </form>
        </div>
    </div>
  )
}

export default Signup
