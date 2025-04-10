import React from 'react'
import Sidebar from '../components/Sidebar'
import {Outlet} from 'react-router-dom'

const PixelChat = () => {


  return (
    <div className='w-[100%] max-w-[100%]  h-[92%] flex '>
        <Sidebar />
        <Outlet />
    </div>
  )
}

export default PixelChat