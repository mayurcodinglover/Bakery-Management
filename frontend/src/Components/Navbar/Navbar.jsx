import React, { useContext } from "react";
import { useState } from "react";
import { assets } from "../../assets/assets";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../Context/StoreContext";

const Navbar = ({ setshowlogin }) => {
  const [select, setselect] = useState("home");
  const { getTotalCartAmount, token, settoken } = useContext(StoreContext);

  const navigate = useNavigate();
  const handlelogout = () => {
    localStorage.removeItem("token");
    settoken(null);
    navigate("/");
  };

  return (
    <div className="navbar flex justify-between items-center p-[1rem]">
      <Link to="/">
        <img src={assets.logo} alt="" className="logo" />
      </Link>
      <ul className="navbar-menu flex justify-center items-center gap-5 text-[17px]">
        <Link
          to="/"
          className={`cursor-pointer  py-1 ${
            select === "home" ? " border-b-2 border-gray " : ""
          } `}
          onClick={() => {
            setselect("home");
          }}
        >
          home
        </Link>
        <a
          href="#explore-menu"
          className={`cursor-pointer  py-1 ${
            select === "menu" ? "border-b-2 border-gray " : ""
          }`}
          onClick={() => {
            setselect("menu");
          }}
        >
          menu
        </a>
        <a
          href="#app-download"
          className={`cursor-pointer  py-1 ${
            select === "mobile-app" ? "border-b-2 border-gray " : ""
          }`}
          onClick={() => {
            setselect("mobile-app");
          }}
        >
          mobile-app
        </a>
        <a
          href="#footer"
          className={`cursor-pointer  py-1 ${
            select === "contact us" ? "border-b-2 border-gray " : ""
          }`}
          onClick={() => {
            setselect("contact us");
          }}
        >
          contact us
        </a>
      </ul>
      <div className="navbar-right flex justify-center items-center gap-10">
        <img src={assets.search_icon} alt="" />
        <div className="navbar-search-icon relative">
          <Link to="/cart">
            <img src={assets.basket_icon} alt="" className=" " />
          </Link>
          <div
            className={
              getTotalCartAmount() === 0
                ? ""
                : "dot absolute min-h-[10px] min-w-[10px] border rounded-lg bg-red-400 right-[-10px] top-[-10px]"
            }
          ></div>
        </div>
        {!token ? (
          <>
            <button
              onClick={() => {
                setshowlogin(true);
              }}
              className="signin bg-transparent m-1 p-2 px-4 rounded-lg border border-gray-300 transition duration-300 font-medium"
            >
              sign in
            </button>
          </>
        ) : (
          <div className="profile relative ">
            <img src={assets.profile_icon} alt="" />
            <ul className="profile-menu absolute hidden  border px-2 py-2 border-black cursor-pointer">
              <li
                className="nav-profile-dropdown flex justify-center items-center gap-5px "
                onClick={() => navigate("/myorder")}
              >
                <img src={assets.bag_icon} alt="" className="w-[1.2rem] mx-2" />
                <p className="mx-2 text-[14px] ">Orders</p>
              </li>
              <hr className="border border-black" />
              <li
                className="nav-profile-dropdown flex justify-center items-center gap-5px"
                onClick={handlelogout}
              >
                <img
                  src={assets.logout_icon}
                  alt=""
                  className="w-[1.2rem] mx-2"
                />
                <p className="mx-2 text-[14px]">Logout</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
