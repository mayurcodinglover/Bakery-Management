import React, { useContext } from 'react'
import './Verify.css'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { StoreContext } from '../../Context/StoreContext';
import axios from 'axios';
import { useEffect } from 'react';

const Verify = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const success=searchParams.get("success");
    const orderId=searchParams.get("oid");
    const navigate=useNavigate();
    console.log(success,orderId);

    const verifyandmovetoorder=async ()=>{
            if(success && orderId)
            {
                navigate("/myorder");
            }
            else{
                navigate("/");
            }
    }

    useEffect(() => {
        setTimeout(async() => {
            await verifyandmovetoorder();
        }, 2000);
      
    }, []);
    
  return (
    <div className='verify'>
      <div className="spinner"></div>
    </div>
  )
}

export default Verify
