import { useState } from 'react'
import './SideBar.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function SideBar() {
  interface typeText{
    item : string
    icon : string
  }
  const profileImage = localStorage.getItem("profile_image") ;
  const user_name = localStorage.getItem("user_name")

  const[isactive , setisActive] = useState<number>(0)
  const Navigate = useNavigate()
  const menuItem : typeText[] = [
    {
      item : "Products",
      icon : "/assets/image/Vector.png"
    },
    {
      item : "Favorites",
      icon : "/assets/image/bookmark 1.png"
    },
    {
      item : "order list",
      icon : "/assets/image/bookmark 1.png"
    },
  ]
  const LogOut = () => {
    axios.post("https://web-production-3ca4c.up.railway.app/api/logout" ,{} , {
      headers : {
        Accept : "application/json",
        Authorization : `Bearer ${localStorage.getItem("token")}`
      }
    })
    .then(() => {
      localStorage.removeItem("token")
      Navigate("/SingUp")
    })
    .catch(error => console.log(error))
  }

  return (
    <section className="w-270 sidpadding d-flex flex-column justify-content-between backColor2" style={{ height: "100vh" }}>
      <div>
        <div className='logo d-flex justify-content-center align-items-center  position-relative'>
          <img src="/TaskAdv-5/assets/image/Group.png" alt="" className="mb-54"/>
        </div>
        <div className="d-flex flex-column justify-content-center align-items-center mb-91">
          <img src={profileImage || "/assets/image/pexels-photo-2379004 1.png"} alt="Profile" className="rounded-circle profile"/>
          <h1 className="font-weight-bold lh-1 fs-6 text-dark mt-4 mb-0">{user_name}</h1>
        </div>
      </div>
  
        <ul className="list-unstyled addHover mb-0 ">
          {
            menuItem.map((item , index) => (
              <li key={index} onClick={() => setisActive(index)} className={`fs-14 lh-1 fw-medium d-flex justify-content-center  align-items-center ${isactive === index ? "isactive" : ""}`}><img src={item.icon} alt="" className="me-2" />{item.item}</li>
            ))
          }
          
        </ul>
        
          <div className='d-flex justify-content-center align-items-center gap-4' onClick={LogOut} >
            <p className='mb-0'>Logout</p>
            <img src="/TaskAdv-5/assets/image/sign-out-alt 1.png" alt="" />
          </div>

    </section>
  )
}

export default SideBar
