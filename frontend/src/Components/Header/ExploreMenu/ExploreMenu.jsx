/* eslint-disable react/prop-types */
import React from "react";
import "./ExploreMenu.css";
import { menu_list } from "../../../assets/assets";
import { useEffect, useState } from "react";

const ExploreMenu = ({ category, setcategory }) => {
  return (
    <div className="explore-menu" id="explore-menu">
      <h1 className="text-[30px] font-bold">Explore our Menu</h1>
      <p className="explore-menu-text">
        Choose from a diverse menu featuring a delectable array of dishes. Our mission is to satisfy your craving and elevate your dining experience one delicious meal at a time.
      </p>
      <div className="explore-menu-list">
        {menu_list.map((item, index) => {
          return (
            <div className="explore-menu-list-item" key={index} onClick={()=>setcategory(prev=>prev===item.menu_name?"All":item.menu_name)}>
              <img 
                src={item.menu_image} 
                alt={item.name} 
                className={`${category === item.menu_name ? "Active" : ""} `} 
              />
              <h3 className="menu-name ">{item.menu_name}</h3>
            </div>
          );
        })}
      </div>
      <hr className="h-[2px] border-none mt-[10px] bg-gray-200 mb-5"/>
    </div>
  );
};

export default ExploreMenu;
