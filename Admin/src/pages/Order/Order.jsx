import React from 'react'
import './Order.css'
import {toast} from 'react-toastify'
import axios from 'axios'
import { useState ,useEffect} from 'react'
import { assets } from '../../../../frontend/src/assets/assets'

const Order = ({url}) => {
  const [order, setorder] = useState([]);
  const [userdata, setuserdata] = useState([]);

  const fetchAllOrder=async()=>{
    const response = await axios.get(url+"/api/order/getallorder",{});

    if(response.data.data)
    {
      setorder(response.data.data);
    }
    else{
      toast.error("Error fetching orders");
    }
  }
console.log(order);
  useEffect(() => {
    fetchAllOrder();
    fetchusername();
  }, [])

  const fetchusername=async(userId)=>{
    console.log(userId);
    const response = await axios.post(url+"/api/order/getuserdata",{userId:userId});
    console.log(response.data.data);
    if(response.data.data)
    {
      setuserdata(response.data.data);
    }
  }
  
  const statusHandler=async(event,orderId)=>{
    const res=await axios.post(url+"/api/order/updatestatus",{
      orderId,
      status:event.target.value
    });
    console.log(event.target.value);
    console.log(orderId);
    
    console.log(res.data);
    if(res.data.success)
      {
        await fetchAllOrder();
      }  
  }
  
  return (
    <div className='w-full'>
    <h1 className='m-2 p-2 text-3xl'>Orders</h1>
      <div className="myroder mt-2">
        <div className="border border-black m-2 p-2 ">
            {order.map((order,index)=>{
                return (
                    <div className='myroder__list m-2 gap-5 main'>
                    <img src={assets.parcel_icon} alt="" />
                    <p>{order.items}</p>
                    <div className="name flex justify-center items-center gap-2">
                      <p>{order.firstname}</p>
                      <p>{order.lastname}</p>
                    </div>
                    <p>{order.address}</p>
                    <p>{order.amount}</p>
                    <p><span>&#x25cf;</span>{order.status}</p>
                    <select onChange={(event)=>{statusHandler(event,order._id)}} value={order.status}>
                      <option value="Food Processing">Food Processing</option>
                      <option value="Out For Delivery">Out For Delivery</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                    </div>
                )
            })}
        </div>
      </div>
    </div>
  )
}

export default Order
