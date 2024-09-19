import React, { useState, useContext } from 'react';
import './FoodDisplay.css';
import { StoreContext } from '../../Context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';

const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext);

  const [priceRange, setPriceRange] = useState(300); // Default value

  const filterFoodByCategoryAndPrice = () => {
    return food_list.filter(item => {
      return (
        (category === "All" || category === item.category) &&
        item.price <= priceRange
      );
    });
  };

  const filteredFoodList = filterFoodByCategoryAndPrice();

  return (
    <div className='food-display mt-10'>
      <h2 className='text-[2rem] font-semibold mb-10'>Top dishes near you</h2>
      <div className="price-filter mb-5">
        <label>
          Price Range: 
          <select 
            value={priceRange} 
            onChange={(e) => setPriceRange(Number(e.target.value))}
            className="ml-3"
          >
            <option value={11}>&lt; 11</option>
            <option value={12}>&lt; 12</option>
            <option value={13}>&lt; 13</option>
            <option value={14}>&lt; 14</option>
            <option value={15}>&lt; 15</option>
            <option value={16}>&lt; 16</option>
            <option value={17}>&lt; 17</option>
            <option value={18}>&lt; 18</option>
            <option value={19}>&lt; 19</option>
            <option value={20}>&lt; 20</option>
          </select>
        </label>
      </div>
      <div className="food-display-list grid grid-cols-4 gap-y-10 gap-[30px]">
        {filteredFoodList.map((item, index) => (
          <FoodItem 
            key={index} 
            id={item._id} 
            category={category} 
            name={item.name} 
            description={item.description} 
            image={item.image} 
            price={item.price} 
          />
        ))}
      </div>
    </div>
  );
};

export default FoodDisplay;
