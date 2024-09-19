import React from 'react'
import './Sidebar.css'
import { assets } from '../../assets/assets'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className=' w-[18%] min-h-[100vh] border border-gray-500 border-t-0'>
      <div className="sidebar flex  pt-[50px] pl-[20%] flex-col gap-[20px]">
        <NavLink to='/add' className="sidebar-content border border-gray-500 flex items-center gap-[12px] border-r-0 cursor-pointer">
            <img src={assets.add_icon} alt="" className='p-2' />
            <p>Add product</p>
        </NavLink>
        <NavLink to='/list' className="sidebar-content border border-gray-500 flex items-center gap-[12px] border-r-0" cursor-pointer>
            <img src={assets.order_icon} alt="" className='p-2'/>
            <p>List Product</p>
        </NavLink>
        <NavLink to='orders' className="sidebar-content border border-gray-500 flex items-center gap-[12px] border-r-0 cursor-pointer">
            <img src={assets.order_icon} alt="" className='p-2'/>
            <p>See orders</p>
        </NavLink>
      </div>
    </div>
  )
}

export default Sidebar
