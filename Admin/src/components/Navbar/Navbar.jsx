import React from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'


const Navbar = () => {
  return (
    <div className='navbar m-2 p-2'>
        <div className="navimage flex justify-between items-center">
            <img src={assets.logo} alt="" className='w-[10%] ml-7'/>
            <img src={assets.profile_image} alt="" className='w-[3.5%] mr-7'/>
        </div>
    </div>
  )
}

export default Navbar
