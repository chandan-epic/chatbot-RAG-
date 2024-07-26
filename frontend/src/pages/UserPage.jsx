

import React from 'react'
import Sidebar from '../components/SideBar'
import { Outlet } from 'react-router-dom'

const UserPage = () => {
  return (
    <div className='flex'>
      <Sidebar/>
      <div  className=' text-white  border-l w-full'>
        <Outlet/>
      </div>
    </div>
  )
}

export default UserPage