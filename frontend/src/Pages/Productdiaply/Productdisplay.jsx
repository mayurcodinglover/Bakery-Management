import React, { useContext,useState,useEffect } from 'react'
import './Productdisplay.css'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { StoreContext } from '../../Context/StoreContext';
import ReviewForm from '../../Components/Review/Review';
import ReviewList from '../../Components/ReviewList/ReviewList';

const Productdisplay = () => {

    const {productid}=useParams();
    const [stock, setstock] = useState(0);
    useEffect(() => {
      const func=async()=>{
        const res=await axios.post(url+"/api/food/getstock",{productid});
        console.log(res.data.data);
        setstock(res.data.data);
      }
      func();
    }, [])
    
    const {url,food_list,addToCart}=useContext(StoreContext);
    console.log(food_list);
    
    const product=food_list.find(item=>item._id===productid);
    console.log(product);
    
    if(!product)
    {
        return <div>Product not found</div>
    }
    
    
  return (
    <div className="container mx-auto p-4">
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <img className="w-full h-64 object-cover object-center" src={url+"/images/"+product.image} alt={product.name} />
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-800">{product.name}</h1>
          <p className="text-gray-600 text-sm mt-2">Category: {product.category}</p>
          <p className="text-gray-700 mt-4">{product.description}</p>
          <div className="flex items-center mt-4">
            <span className="text-3xl font-bold text-red-500">${product.price}</span>
          </div>
          {stock>0?<button
            onClick={() => addToCart(product._id)}
            className="mt-6 px-6 py-2 text-sm font-semibold text-white bg-red-500 rounded hover:bg-red-600 focus:outline-none"
          >
            Add to Cart
          </button>:<div className='text-[1.5rem]'>Out of Stock</div>}
        </div>
      </div>
      <ReviewForm productId={product._id}/>
      
    </div>
  )
}

export default Productdisplay
