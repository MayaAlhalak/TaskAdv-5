
import { Outlet } from 'react-router-dom'
import SideBar from '../SideBar/SideBar'

function Root() {
  return (
    <div className='d-flex min-vh-100'>
      <SideBar/>
      <div className='flex-grow-1'>
        <Outlet/>
      </div>
    </div>
  )
}

export default Root
