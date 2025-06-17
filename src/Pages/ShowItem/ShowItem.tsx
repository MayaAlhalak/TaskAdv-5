import './ShowItem.css'
import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

interface item{
    id : number,
    name : string,
    price : number,
    image_url : string,
    updated_at :string,
    created_at:string

}
function ShowItem() {
    const Navigate = useNavigate()
     const[olditem , setolditem] = useState<item | null>(null)
     const goToDashboard = () =>{
        Navigate("/dashboard")
    }
    const {id} = useParams<{ id: string }>()
     useEffect(() => {
        axios.get(`https://web-production-3ca4c.up.railway.app/api/items/${id}`,
            {
                headers :{
                    Accept : "application/json",
                    Authorization :`Bearer ${localStorage.getItem("token")}`
                }
            }
        )
        .then(res => 
           {
             
            const formattedData = {
            ...res.data,
            created_at: new Date(res.data.created_at).toLocaleDateString("en-GB"),
            updated_at: new Date(res.data.updated_at).toLocaleDateString("en-GB"),
        };
        setolditem(formattedData)
           }
    )
        .catch(error => console.log(error))
    },[id])
  return (
    <>
       <button className='border border-0'><img src="/assets/image/Control.png" alt="" onClick={goToDashboard} /></button>
       <h2 className="lh-1 fs-60 fw-semibold text-black mt-76 mb-40">{olditem?.name}</h2>
       <div className="imgiphon mx-auto"><img src={olditem?.image_url}  alt="" /></div>
      <div className='d-flex  align-items-center gap-176px   flex-wrap'>
        <div className='d-flex justify-content-center gap-4 align-items-center ' >
            <h3 className='lh-1 fs-60 fw-semibold'>price:</h3>
            <p className='mb-0'>{olditem?.price}</p>
        </div>
        <div className='d-flex justify-content-center align-items-center gap-4'>
            <h3 className='lh-1 fs-60 fw-semibold'>Added at:</h3>
            <p className='mb-0'>{olditem?.updated_at}</p>
        </div>
        <div className='d-flex justify-content-center align-items-center gap-4'>
            <h3 className='lh-1 fs-60 fw-semibold'>updated at:</h3>
            <p className='mb-0'>{olditem?.created_at}</p>
        </div>
      </div>
    </>
  )
}

export default ShowItem
