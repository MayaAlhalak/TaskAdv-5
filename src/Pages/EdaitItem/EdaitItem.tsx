
import axios from "axios"
import {  useEffect, useRef, useState } from "react"
import { Form } from "react-bootstrap"
import { useNavigate, useParams } from "react-router-dom"

interface item{
    id : number,
    name : string,
    price : number,
    image_url : string
}

function EdaitItem() {
    const {id} = useParams<{ id: string }>()
    const nameref = useRef<HTMLInputElement>(null)
    const Priceref = useRef<HTMLInputElement>(null) 
    const imgref = useRef<HTMLInputElement>(null)
    const navigate = useNavigate()
    const[olditem , setolditem] = useState<item | null>(null)
    const goToDashboard = () =>{
        navigate("/dashboard")
    }
    useEffect(() => {
        axios.get(`https://web-production-3ca4c.up.railway.app/api/items/${id}`,
            {
                headers :{
                    Accept : "application/json",
                    Authorization :`Bearer ${localStorage.getItem("token")}`
                }
            }
        )
        .then(res => setolditem(res.data))
        .catch(error => console.log(error))
    },[id])
    const handladeupdate = () =>{
         axios.post(`https://web-production-3ca4c.up.railway.app/api/items/${id}`,
        {
            name:nameref.current?.value,
            price:Priceref.current?.value,
            image : imgref.current?.files?.[0],
            _method:"put"
        },
        {
            headers:{
                Authorization :`Bearer ${localStorage.getItem("token")}`,
                Accept :"application/json",
                "Content-Type": "multipart/form-data"
            }
        }
    )
    .then(res => {
        console.log("update:" , res.data)
        navigate("/dashboard")
    }
)
    .catch(error => console.log(error))
    }
   
  return (
    <section className="padadd">
      <button className='border border-0'><img src="/TaskAdv-5/assets/image/Control.png" alt="" onClick={goToDashboard} /></button>
      <h2 className='fw-semibold fs-60 title '>edit ITEM</h2>
      <Form className='FormAdd d-flex  align-items-center  flex-lg-nowrap flex-wrap'>
      <div>
        <Form.Group className="mb-64" controlId="exampleForm.ControlInput1">
            <Form.Label className='fs-2 lh-1 fw-medium  color-gray mb-3'>Name</Form.Label>
            <Form.Control type="text" placeholder="Enter the product name" className='inputAdd  fw-medium text-dark' ref={nameref} defaultValue={olditem?.name} />
        </Form.Group>
      <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label className='fs-2 lh-1 fw-medium  color-gray mb-3 '>Price</Form.Label>
            <Form.Control type="number" placeholder="Enter the product price  fw-medium" className='inputAdd'  ref={Priceref} defaultValue={olditem?.price}/>
      </Form.Group>
      </div>
      <div>
         <Form.Group >
            <Form.Label className='fs-2 lh-1 fw-medium  color-gray mb-14 '>Image</Form.Label>
            <Form.Control type="file" className={`file-input backColorBlue p-0 text-dark ${olditem?.image_url ?'' : "file-input1"}`}
            style={olditem?.image_url ? { 
            backgroundImage: `url(${olditem.image_url})`, 
            backgroundSize: '280px 208px', 
            backgroundPosition: 'center', 
            width: '547px', 
            height: '209px' } : {}}
            ref={imgref}/>
        </Form.Group>
      </div>
    </Form>
    <div className='d-flex justify-content-center align-items-center mt-120' >
      <button className='btnSave border border-0  lh-1 fs-2 fw-medium backColor text-light reduis-4' onClick={handladeupdate} >Save</button>
    </div>
    </section>
  )
}

export default EdaitItem
