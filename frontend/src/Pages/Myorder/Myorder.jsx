import React, { useContext } from 'react'
import { StoreContext } from '../../Context/StoreContext'
import axios from 'axios';
import { useEffect } from 'react';
import assert from 'assert';
import { assets } from '../../assets/assets';
import './Myorder.css'

const Myorder = () => {

    const {url,token}=useContext(StoreContext);
    const [myorder, setMyorder] = React.useState([]);

    const userorder=async()=>{
        const response=await axios.post(url+"/api/order/userorder",{},{headers:{token}});
        setMyorder(response.data.order);
        
    }
    console.log(myorder);
    useEffect(() => {
        if(token)
        {
            userorder();
        }
    }, [token])
    

  return (
    <div>
      <div className="myroder ">
        <h2>My order</h2>
        <div className="border border-black flex flex-col justify-center m-2 p-2">
            {myorder.map((order,index)=>{
                return (
                    <div className='myroder__list m-2'>
                    <img src={assets.parcel_icon} alt="" />
                    <p>{order.items}</p>
                    <p>{order.amount}</p>
                    <p><span>&#x25cf;</span>{order.status}</p>
                    <button className='border h-10' onClick={userorder}>Track order</button>
                    </div>
                )
            })}
        </div>
      </div>
    </div>
  )
}

export default Myorder
