import React from 'react'
import './Header.css'

const Header = () => {
  return (
    <div className='header'>
      <div className="header-content absolute flex flex-col items-start gap-[1.5vw] max-w-[50%] bottom-[10%] left-[6vw]">
            <h1 className='h1-text text-[4vw] text-white'>Order Your favourite food here</h1>
            <p className='text-white leading-5'>choose from a diverse menu featuring a delectable array of dishes crafted with the finest ingredients and culinary expertise or mission is to satisfy your craving and elecate your dining experience one delicious mean at a time </p>
            <button type="button" className='border border-white px-4 p-2 rounded-lg text-gray-500 bg-white'>view menu</button>
      </div>
    </div>
  )
}

export default Header
