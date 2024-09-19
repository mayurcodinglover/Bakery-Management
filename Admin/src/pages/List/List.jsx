import {React,useState,useEffect} from 'react'
import './List.css'
import axios from 'axios';
import { toast } from 'react-toastify';

const List = ({url}) => {

  const [list, setlist] = useState([]);

  
  const fetchList=async ()=>{
      const response=await axios.get(`${url}/api/food/list`);
      console.log(response.data);
      if(response.data.success)
      {
        setlist(response.data.data)
      }
      else{
        toast.error("Error");
      }
  }
  useEffect(() => {
      fetchList();
  }, [])

  const handleRemove=async (itemid)=>{
    const response=await axios.post(`${url}/api/food/remove`,{id:itemid});
    if(response.data.success)
    {
      toast.success("Data removed successfully");
    }
    else{
      toast.error("Error"); 
    }
    await fetchList();
  }
  

  return (
    <div className=' main-div w-[70%] m-[4rem]'>
          <div className="displaydata">
            <p>All Food List</p>
            <div className="food-table">
              <div className="heading-title">
                <b>Image</b>
                <b>Name</b>
                <b>Category</b>
                <b>Price</b>
                <b>Stock</b>
                <b>Action</b>
              </div>
              <div className="content">
                {list.map((item,index)=>{
                  return(
                    <div className="content-data" key={index}>
                    <img src={`${url}/images/`+item.image} alt="" className='w-[50px]'/>
                    <p>{item.name}</p>
                    <p>{item.category}</p>
                    <p>{item.price}</p>
                    <p>{item.stock}</p>
                    <p onClick={()=>{handleRemove(item._id)}} className='cursor-pointer'>X</p>
                    </div>
                  )
                })}
              </div>
            </div>

          </div>
    </div>
  )
}

export default List
