import {  Link, useNavigate } from 'react-router-dom'
import Title from '../../commponent/Title/Title'
import { Form } from 'react-bootstrap'
import { useRef, type FormEvent } from 'react'
import axios from 'axios'

function SingUp() {
  const first_name = useRef<HTMLInputElement>(null)
  const last_name = useRef<HTMLInputElement>(null)
  const email = useRef<HTMLInputElement>(null)
  const password = useRef<HTMLInputElement>(null)
  const password_confirmation =useRef<HTMLInputElement>(null)
  const profile_image = useRef<HTMLInputElement>(null)

  const Navigate = useNavigate()
  const SendUp= (Event:FormEvent) =>{
    Event.preventDefault();
    axios.post("https://web-production-3ca4c.up.railway.app/api/register" , {
      first_name : first_name.current?.value,
      last_name  :  last_name .current?.value,
      user_name :`${ first_name.current?.value} + ${last_name.current?.value}`,
      email : email.current?.value,
      password : password.current?.value,
      password_confirmation : password_confirmation.current?.value,
      profile_image :profile_image.current?.files?.[0],
    }
  ,{
    headers : {
        Accept : "application/json",
       "Content-Type" : "multipart/form-data"
    }
  })
  .then(res => {
        console.log(res.data)
        localStorage.setItem("profile_image", res.data.data.user.profile_image_url)
        localStorage.setItem("user_name", res.data.data.user.user_name)
         Navigate("/")

  }

)
  .catch(error => {
  if (error.response) {
    console.log('Error Response:', error.response.data); // 👈 يعرض تفاصيل الخطأ
  } else {
    console.log(error);
  }
});
  }
  return (
      <section className='min-vh-100 d-flex flex-column justify-content-center align-items-center backColor'>
           <div className='allinfo   bg-light border-radius custom1-padding'>
              <Title
                show = {false}
                  img="/TaskAdv-5//assets/image/Group.png"
                  title="Sign up"
                  text="Fill in the following fields to create an account."/>
                   <Form>   
                    <Form.Group  controlId="exampleForm.ControlInput1">
                        <Form.Label className='fs-14 fw-medium lh-1 color-gray'>Name</Form.Label>
                        <div className='d-flex justify-content-between align-items-cente mb-3 flex-column flex-lg-row gap-3'>
                          <Form.Control type="text" placeholder="First Name"  className=' w-200' ref ={first_name}/>
                          <Form.Control type="text" placeholder="Last Name"  className=' w-200' ref ={last_name}/>
                        </div>
                    </Form.Group>
                        <Form.Group className='mb-3' controlId="exampleForm.ControlInput1">
                          <Form.Label className='fs-14 fw-medium lh-1 color-gray mb-10'>Email</Form.Label>
                          <Form.Control type="email" placeholder="Enter your Email "  ref={email}/>
                        </Form.Group>
                     <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label className='fs-14 fw-medium lh-1 color-gray mb-10'>Password</Form.Label>
                        <div className='d-flex justify-content-between align-items-cente mb-3 flex-column flex-lg-row gap-3'>
                          <Form.Control type="text" placeholder="Enter password"  className='w-200' ref={password}/>
                          <Form.Control type="text" placeholder="Re-enter your password"  className='w-200' ref= {password_confirmation}/>
                        </div>
                    </Form.Group>
                    <Form.Group className='mb-3'>
                      <Form.Label className='fs-14 fw-medium lh-1 color-gray mb-3'>Profile Image</Form.Label>
                      <Form.Control type="file" className='border  border-2 border-dotted  file-input file-input2' ref={profile_image}/>
                    </Form.Group>
                </Form>
              <button className=' fs-14 fw-medium text-light backColor border border-0 btnSinUp mb-4' onClick={SendUp}>SIGN UP</button>
              <p className='text-center fs-14 color-gray mb-0' >Do you have an account? <Link className='colorLink' to= '/'>Sign in </Link></p>
           </div>
    </section>
  )
}

export default SingUp
