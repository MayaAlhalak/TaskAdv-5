import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import SignIn from './Pages/SignIn/SignIn.tsx'
import SingUp from './Pages/SingUp/SingUp.tsx'
import Dashboard from './Pages/Dashboard/Dashboard.tsx';
import AddIems from './Pages/AddIems/AddIems.tsx';
import Dashboards from './commponent/Dashboards/Dashboards.tsx';
import EdaitItem from './Pages/EdaitItem/EdaitItem.tsx';
import ShowItem from './Pages/ShowItem/ShowItem.tsx';


const routes = createBrowserRouter(
  [
    {
      path : "/",
      element : <SignIn/>,
    },
    {
      path: "SingUp",
      element : <SingUp/>
    },
    {
      path :"/",
      element: <Dashboards/>, 
      children: [
    {
      path: "dashboard",
      element :<Dashboard/>,

    },
    {
       path: "dashboard/AddIems",
        element :<AddIems/>
    },
    {
       path: "dashboard/EdaitItem/:id",
        element :<EdaitItem/>
    },
    {
       path: "dashboard/ShowItem/:id",
        element :<ShowItem/>
    }
      ]
    }
  ]
  ,{ basename: "/TaskAdv-5" }
)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
   <RouterProvider router={routes} />
  </StrictMode>,
)
