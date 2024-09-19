import "./Add.css";
import { assets, url } from "../../assets/assets";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Add = ({url}) => {
  const [image, setimage] = useState(false);
  const [data, setdata] = useState({
    name: "",
    description: "",
    category: "Salad",
    price: "",
  });

  useEffect(() => {
    console.log(data);
  }, [data]);

  const onchangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setdata((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    formData.append("stock",Number(data.stock));
    formData.append("image", image);

    const response = await axios.post(`${url}/api/food/add`, formData);
    if (response.data.success) {
      setdata({
        name: "",
        description: "",
        category: "Salad",
        price: "",
        stock:"",
      });
      setimage(false);
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
  };
  return (
    <div className="main-div">
      <div className="form">
        <form
          action=""
          className="input mt-[3rem] ml-[5rem]"
          onSubmit={onSubmitHandler}
        >
          <div className="imageupload m-3">
            <p className="m-2">Upload image</p>
            <label htmlFor="image">
              <img
                src={image ? URL.createObjectURL(image) : assets.upload_area}
                alt=""
                className="w-[6rem] m-2"
              />
            </label>
            <input
              onChange={(e) => setimage(e.target.files[0])}
              type="file"
              id="image"
              name="image"
              className="hidden"
            />
          </div>
          <div className="name m-3">
            <p className="m-1">Product Name</p>
            <input
              onChange={onchangeHandler}
              value={data.name}
              type="text"
              name="name"
              placeholder="Product Name"
              className="input border m-1 p-2 w-[100%] rounded-md border-gray-400"
            />
          </div>
          <div className="desc m-3">
            <p className="m-1">Description</p>
            <textarea
              onChange={onchangeHandler}
              value={data.description}
              name="description"
              id="desc"
              cols="50"
              rows="4"
              placeholder="des  cription..."
              className="border m-1 p-2 w-[100%] rounded-md border-gray-400"
            ></textarea>
          </div>
          <div className="category-price m-3 flex justify-between">
            <div className="category m-2">
              <p className="m-1">Product category</p>
              <select
                onChange={onchangeHandler}
                value={data.category}
                name="category"
                id="" 
                className="m-1 border p-2 rounded-md border-gray-400"
              >
                <option value="Salad">Salad</option>
                <option value="Rolls">Rolls</option>
                <option value="Deserts">Deserts</option>
                <option value="Sandwich">Sandwich</option>
                <option value="Cake">Cake</option>
                <option value="Pure Veg">Pure Veg</option>
                <option value="Pasta">Pasta</option>
                <option value="Noodles">Noodles</option>
              </select>
            </div>
            <div className="price m-2">
              <p className="m-1">Product price</p>
              <input
                type="number"
                onChange={onchangeHandler}
                value={data.price}
                name="price"
                id=""
                className="border m-1 p-2 rounded-md border-gray-400"
              />
            </div>
            <div className="stock m-2">
              <p className="m-1">Product Stock</p>
              <input type="number" name="stock" onChange={onchangeHandler} value={data.stock} id="" className="border m-1 p-2 rounded-md border-gray-400"/>
            </div>
          </div>
          <button className="m-1 mx-6 border border-gray-400 p-2 w-[9rem] bg-black text-white">
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default Add;
