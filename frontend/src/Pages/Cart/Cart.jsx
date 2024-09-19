import React, { useContext, useEffect } from 'react';
import { StoreContext } from '../../Context/StoreContext';
import { useNavigate } from 'react-router-dom';
import './Cart.css';

const Cart = () => {
  const { food_list = [], removeFromCart, cartItems = {}, getTotalCartAmount, resetcart, url, token ,fetchFoodList,setcartItems} = useContext(StoreContext);
  const navigate = useNavigate();

  // Proceed to checkout function
  const proceedtoCheckout = () => {
    if (!token || getTotalCartAmount() === 0) {
      navigate('/cart');
    } else {
      navigate('/order');
    }
  };

  // Check if cart is empty
  console.log(cartItems);
  const isCartEmpty = Object.keys(cartItems).length === 0 || food_list.every(item => !cartItems[item._id]);

  console.log(isCartEmpty);
  
  
  // Reset cart if it's empty or after payment



  return (
    <div>
      <div className="cart mt-[100px]">
        <div className="cartitems grid">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {isCartEmpty ? (
          <div className="empty-cart">Empty Cart</div>
        ) : (
          food_list.map((item, index) => {
            if (cartItems[item._id] > 0) {
              return (
                <React.Fragment key={index}>
                  <div className="cartitems cart-items my-4">
                    <img src={`${url}/images/${item.image}`} alt="" className="w-[50px]" />
                    <p>{item.name}</p>
                    <p>{item.price}</p>
                    <p>{cartItems[item._id]}</p>
                    <p>{item.price * cartItems[item._id]}</p>
                    <p className="cursor-pointer" onClick={() => removeFromCart(item._id)}>x</p>
                  </div>
                  <hr className="border-none h-[1px] bg-gray-300" />
                </React.Fragment>
              );
            }
            return null;
          })
        )}
      </div>

      <div className="cart-bottom flex justify-between items-center mt-16">
        <div className="cart-total flex flex-col justify-center items-start w-[50%]">
          <h2 className="text-[25px] font-bold my-2">Cart Total</h2>
          <div className="inner mt-2 w-[100%]">
            <div className="cart-total-details flex justify-between m-2 p-2">
              <p>Subtotal</p>
              <p>{getTotalCartAmount()}</p>
            </div>
            <div className="cart-total-details flex justify-between m-2 p-2">
              <p>Delivery Fee</p>
              <p>{getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <div className="cart-total-details flex justify-between m-2 p-2">
              <p>Total</p>
              <p>{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</p>
            </div>
            <button className="m-2 p-2 border bg-red-400 text-white border-none rounded-md" onClick={proceedtoCheckout}>
              Proceed To Checkout
            </button>
          </div>
        </div>
        <div className="cart-promocode m-2 p-2 w-[40%]">
          <div className="card-promo-detail m-2 p-2">
            <p className="m-1 p-1 text-gray-500">If you have a promo code, enter it here</p>
            <div className="cart-promocode-input m-1 p-1">
              <input type="text" placeholder="Promo Code" className="bg-gray-500 w-[75%] p-2 text-white mx-2 rounded-md" />
              <button className="btnapply border bg-black text-white p-2 px-3 rounded-md">Apply</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
