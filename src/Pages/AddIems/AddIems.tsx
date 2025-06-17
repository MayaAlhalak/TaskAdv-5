import { useNavigate } from 'react-router-dom'
import './AddIems.css'
import { Form } from 'react-bootstrap'
import axios from 'axios'
import { useRef, type FormEvent } from 'react'

function AddIems() {
    const navigate = useNavigate()
    const name = useRef<HTMLInputElement>(null)
    const price = useRef<HTMLInputElement>(null)
    const image = useRef<HTMLInputElement>(null)
    const goToDashboard = () =>{
        navigate("/dashboard")
    }
    const AddItems =(event : FormEvent) =>{
      event.preventDefault()
      axios.post("https://web-production-3ca4c.up.railway.app/api/items" , {
        name:name.current?.value,
        price:price.current?.value,
        image : image.current?.files?.[0]
      },
      {
        headers :{
          Authorization :`Bearer ${localStorage.getItem("token")}`,
          Accept: "application/json",
          "Content-Type" : "multipart/form-data"
        }
      }
    )
    .then(res => {
      console.log(res)
      navigate("/dashboard")
    })
    .catch(error => console.log(error))
    }
  return (
    <>
      <button className='border border-0'><img src="/assets/image/Control.png" alt="" onClick={goToDashboard} /></button>
      <h2 className='fw-semibold fs-60 title '>ADD NEW ITEM</h2>
      <Form className='FormAdd  d-flex  align-items-center flex-lg-nowrap flex-wrap  '>
      <div>
        <Form.Group className="mb-64" controlId="exampleForm.ControlInput1">
            <Form.Label className='fs-2 lh-1 fw-medium  color-gray mb-3'>Name</Form.Label>
            <Form.Control type="text" placeholder="Enter the product name" className='inputAdd' ref={name} />
        </Form.Group>
      <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label className='fs-2 lh-1 fw-medium  color-gray mb-3 '>Price</Form.Label>
            <Form.Control type="number" placeholder="Enter the product price " className='inputAdd' ref={price} />
      </Form.Group>
      </div>
      <div>
         <Form.Group >
            <Form.Label className='fs-2 lh-1 fw-medium color-gray mb-14 '>Image</Form.Label>
            <Form.Control type="file" className=' file-input file-input1 backColorBlue p-0' ref={image}/>
        </Form.Group>
      </div>
    </Form>
    <div className='d-flex justify-content-center align-items-cente lg:mt-120 mt-76'>
      <button className='btnSave border border-0  lh-1 fs-2 fw-medium backColor text-light reduis-4' onClick={AddItems}>Save</button>
    </div>
    </>
  )
}

export default AddIems
