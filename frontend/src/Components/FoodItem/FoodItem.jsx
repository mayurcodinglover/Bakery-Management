import React, { useContext, useState } from 'react'
import './FoodItem.css'
import axios from 'axios'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../Context/StoreContext';
import {useNavigate} from 'react-router-dom'
import { useEffect } from 'react';

const FoodItem = ({id,name,price,image,category,description}) => {

  const {cartItems,addToCart,removeFromCart,url}=useContext(StoreContext);
  const [stock, setstock] = useState(0);
  const navigate=useNavigate();
  
  const handleproduct=(id)=>{
    console.log(id);
    navigate(`/productdisplay/${id}`);
  }

  useEffect(() => {
    const func=async()=>{
      const res=await axios.post(url+"/api/food/getstock",{id});
      console.log(res.data.data);
      setstock(res.data.data);
    }
    func();
  }, [stock])
  

  

  return (
    <div className='food-item '>
      <div className="food-item-img-container relative">
        <img className="food-item-img relative" src={url+"/images/"+image} onClick={()=>handleproduct(id)}/>
        {stock>0?(cartItems && cartItems[id]?
        <div className='counter absolute bottom-3 right-3 flex justify-between items-center p-1 gap-2 bg-white rounded-lg '>
            <img src={assets.remove_icon_red} onClick={()=>removeFromCart(id)} alt="" className='w-7' />
            <p className='text-[12px]'>{cartItems[id]}</p>
            <img src={assets.add_icon_green} onClick={()=>addToCart(id)} alt="" className='w-7' />
        </div>:<img onClick={()=>addToCart(id)} src={assets.add_icon_white} className='absolute bottom-3 right-3 w-9' />
          
        ):<p className='text-[1.5rem] text-center border border-solid border-r-gray-600'>Out of Stock</p>}
        
      </div>
      <div className="food-item-info p-[20px]">
        <div className="food-item-name-rating flex justify-between mb-[10px]">
          <p className='text-[17px]'>{name}</p>
          <img src={assets.rating_starts} alt="" className='w-[60px] h-[15px] mt-[5px]'/>
        </div>
        <p className="food-item-desc text-gray-500 text-[12px]" >{description}</p>
        <p className="food-item-price my-[10px] text-red-400 text-[22px] font-bold">${price}</p>
      </div>
    </div>
  )
}

export default FoodItem
