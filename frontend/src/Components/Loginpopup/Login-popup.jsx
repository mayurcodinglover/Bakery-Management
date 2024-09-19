import React, { useContext } from "react";
import { assets } from "../../assets/assets";
import { useState, useEffect } from "react";
import { StoreContext } from "../../Context/StoreContext";
import axios from 'axios';

export const Loginpopup = ({ setshowlogin }) => {
  const [currstate, setcurrstate] = useState("Sign up");
  const [data, setdata] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { url,settoken } = useContext(StoreContext);
  const handleChange = (e) => {
    console.log("click");
    const name = e.target.name;
    const value = e.target.value;
    setdata({ ...data, [name]: value });
  };
  useEffect(() => {
    console.log(data);
  }, [data]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newurl = url;
    if (currstate === "Sign up") {
      newurl += "/api/user/register";
    } else {
      newurl += "/api/user/login";
    }
    const response=await axios.post(newurl,data);
    if(response.data.success==="true")
    {
      console.log(response.data.token);
        settoken(response.data.token);
        localStorage.setItem("token",response.data.token);
        setshowlogin(false);
    }
    else{
        alert(response.data.message);
    }
  };

  return (
    <div className="absolute z-10 w-[100%] h-[100%] bg-[#00000090] grid">
      <form
        className="popup-container place-self-center text-[#808080] bg-white flex flex-col gap-[25px] px-6 py-8 rounded-lg text-[14px]"
        onSubmit={handleSubmit}
      >
        <div className="login-pop-up-title flex justify-between items-center">
          <h2 className="text-[20px] font-bold">{currstate}</h2>
          <img
            onClick={() => setshowlogin(false)}
            src={assets.cross_icon}
            alt=""
            className="w-[18px]"
          />
        </div>
        <div className="popup-login-input flex flex-col gap-4 justify-center items-center">
          {currstate === "Sign up" ? (
            <>
              <input
                onChange={handleChange}
                className="w-[80%] input border p-[1rem]"
                type="text"
                name="name"
                placeholder="Your Name"
                value={data.name}
                required
              />
              <input
                onChange={handleChange}
                className="p-[1rem] border w-[80%]"
                type="email"
                name="email"
                placeholder="Your Email"
                value={data.email}
                required
              />
              <input
                onChange={handleChange}
                type="password"
                name="password"
                value={data.password}
                className="input p-[1rem] border w-[80%]"
                placeholder="Your Password"
                required
              />
            </>
          ) : (
            <>
              <input
                onChange={handleChange}
                className="p-[1rem] w-[80%] border"
                type="email"
                name="email"
                placeholder="Your Email"
                value={data.email}
                required
              />
              <input
                onChange={handleChange}
                className="input p-[1rem] border w-[80%]"
                type="password"
                name="password"
                placeholder="Your Password"
                value={data.password}
                required
              />
            </>
          )}
        </div>
        <div className="btn flex justify-center items-center">
          <button
            className="p-[1rem] w-[80%] bg-red-500 text-white rounded-md font-bold"
            type="submit"
          >
            {currstate === "Sign up" ? "Create account" : "Log in"}
          </button>
        </div>

        <div className="popup-condition flex items-center">
          <input
            type="checkbox"
            name="check"
            id=""
            required
            className="mx-2 w-8"
          />
          <p className="mx-2">
            By continuing , i agree to the terms of use & privacy policy
          </p>
        </div>
        {currstate === "Login" ? (
          <>
            <p>
              Create a new Account ?{" "}
              <span onClick={() => setcurrstate("Sign up")}>Click here</span>
            </p>
          </>
        ) : (
          <>
            <p>
              Already Have an account{" "}
              <span onClick={() => setcurrstate("Login")}>Login here</span>
            </p>
          </>
        )}
      </form>
    </div>
  );
};
