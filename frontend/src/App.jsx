import React from 'react'
import Navbar from './Components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home/Home'
import Cart from './Pages/Cart/Cart'
import Placeorder from './Pages/Placeorder/Placeorder'
import Footer from './Components/Footer/Footer'
import { useState } from 'react'
import { Loginpopup } from './Components/Loginpopup/Login-popup'
import Verify from './Pages/Verify/Verify'
import Myorder from './Pages/Myorder/Myorder'
import Productdisplay from './Pages/Productdiaply/Productdisplay'

const App = () => {

  const [showlogin, setshowlogin] = useState(false)
  return (
    <>
    {showlogin?<Loginpopup setshowlogin={setshowlogin}/>:<></>}
      <div className='w-[80%] m-auto'>
      <Navbar setshowlogin={setshowlogin}/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/order' element={<Placeorder/>}/>
        <Route path='/verify' element={<Verify/>}/>
        <Route path='/myorder' element={<Myorder/>}/>
        <Route path='/login' element={<Loginpopup/>}/>
        <Route path="/productdisplay/:productid" element={<Productdisplay />} />
      </Routes>
    </div>
    <Footer/>
    </>
  )
}

export default App
