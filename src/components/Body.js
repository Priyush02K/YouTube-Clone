import React from 'react'
import Sidebar from './Sidebar'
import MainCounter from './MainCounter'
import { Outlet } from 'react-router-dom'




const Body = () => {
  return (
    <div className="flex ">
      

      <Sidebar/>
      {/* <MainCounter/> */}
      <Outlet/>

    </div>
  )
}

export default Body;
