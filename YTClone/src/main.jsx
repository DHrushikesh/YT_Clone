import {  StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter , RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import HomePAgeCardsContainer from './components/HomepageCardsContainer.jsx'
import VideoPLayer from './components/VideoPlayer.jsx'
import SignIn from './components/signin.jsx'
import Login from './components/Login.jsx'
import Channel from './components/channel.jsx'
import AddVideo from './components/AddVideo.jsx'
import EditVideo from './components/EditVideo.jsx'

const routes = createBrowserRouter([
  {
    path:"/",
    element:<App/>,
    errorElement:<h1>404 Not Found</h1>,
    children:[
      {
        path:"/",
        element:<HomePAgeCardsContainer />
      },
      {
        path:"/VideoPlayer/:id",
        element:<VideoPLayer/>
      },
      {
        path:"SignIn",
        element:<SignIn/>
      },
      {
        path:"Login",
        element:<Login/>

      },
      {
        path:"Channel",
        element:<Channel/>
      },
      {
        path:"/addvideo",
        element:<AddVideo/>
      },
      { path : "/editvideo/:videoId" ,
        element : <EditVideo/>
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={routes} />
  </StrictMode>,
)
