import React from 'react'
import './AppDownload.css'
import { assets } from '../../assets/assets'

const AppDownload = () => {
  return (
    <div className='Appdownload 'id='app-download'>
      <p>For Better Experience Download <br/>Tomato App</p>
      <div className="app-download-img flex justify-center items-center mt-[3rem] gap-10">
        <img src={assets.app_store} alt="" className='img1 w-[15%] cursor-pointer' />
        <img src={assets.play_store} alt="" className='img1 w-[15%] cursor-pointer' />
      </div>
    </div>
  )
}

export default AppDownload
