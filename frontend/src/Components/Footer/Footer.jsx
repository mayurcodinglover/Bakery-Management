import React from 'react'
import { assets } from '../../assets/assets'
import './Footer.css'

const Footer = () => {
  return (
    <div className='mt-[100px]' id='footer'>
      <footer className="footer bg-gray-800 flex flex-col items-center gap-5 py-[20px] px-[8vw] text-gray-300">
        <div className="footer-content mt-14 ">
            <div className="left">
                <img src={assets.logo} alt="" />
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Hic iste ipsa optio enim in eaque fugiat laboriosam est dolorem temporibus!</p>
                <div className="social flex w-[40px]">
                    <img className='mr-4' src={assets.facebook_icon} alt="" />
                    <img className='mr-4' src={assets.linkedin_icon} alt="" />
                    <img className='mr-4' src={assets.twitter_icon} alt="" />
                </div>
            </div>
            <div className="center">
                <h2 className='text-[27px] font-bold text-white'>Company</h2>
                <ul className='cursor-pointer'>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Delivery</li>
                    <li>Privacy policy</li>
                </ul>
            </div>
            <div className="right">
                <h2 className='text-[27px] font-bold text-white'>Get In Touch</h2>
                <ul>
                    <li>+1-212-456-7890</li>
                    <li>contact@tomato.com</li>
                </ul>
            </div>
        </div>
        <hr className='h-[2px] w-[100%] mt-5 bg-gray-700 border-none'/>
        <p className='copy'>Copyright © 2020 Tomato. All rights reserved</p>
      </footer>
    </div>
  )
}

export default Footer
