import './SignIn.css'
import Title from "../../commponent/Title/Title"
import { Link, useNavigate } from 'react-router-dom'
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useRef, type FormEvent } from 'react';

function SignIn() {
  const email = useRef<HTMLInputElement>(null)
  const password = useRef<HTMLInputElement>(null)
  const Navigate = useNavigate()


  const SendDate=(Event:FormEvent) =>{
    Event.preventDefault();
     axios.post("https://web-production-3ca4c.up.railway.app/api/login" , 
    {
      email : email.current?.value,
      password : password.current?.value
    },
    {
      headers:{
        Accept : "application/json",
        "Content-Type" :"multipart/form-data"
      }
    }
    
  )
  .then(res => {console.log(res)
    localStorage.setItem("token", res.data.token)
    Navigate("dashboard")
  
  }
)
  .catch(error => console.log(error))
  }
 
  return (
    <section className='min-vh-100 d-flex flex-column justify-content-center align-items-center backColor'>
           <div className='allinfo w-476 bg-light border-radius custom-padding'>
              <Title
                  show = {true}
                  img="/TaskAdv-5/assets/image/Group.png"
                  title="Sign In"
                  text="Enter your credentials to access your account"/>
               <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                      <Form.Label className='fs-14 fw-medium lh-1 color-gray mb-10'>Email</Form.Label>
                      <Form.Control type="email" placeholder="Enter your email"  className='mb-20' ref={email}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                      <Form.Label className='fs-14 fw-medium lh-1 color-gray mb-10'>Password</Form.Label>
                      <Form.Control type="email" placeholder="Enter your password" className='mb-20' ref={password}/>
                    </Form.Group>
                </Form>
              <button className=' fs-14 fw-medium text-light backColor border border-0 btn-padding mb-27' onClick={SendDate}>SIGN IN</button>
              <p className='text-center fs-14 color-gray' >Don’t have an account? <Link className='colorLink' to= '/SingUp'>Create one</Link></p>
           </div>
    </section>
  )
}

export default SignIn
