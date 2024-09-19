import React, { useContext, useState, useEffect } from 'react';
import { StoreContext } from '../../Context/StoreContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Placeorder = () => {
  const { getTotalCartAmount, cartItems, food_list, resetcart, token, url, setcartItems } = useContext(StoreContext);
  const [userid, setuserid] = useState("");
  const [paymentMethod, setPaymentMethod] = useState(''); // Can be 'razorpay' or 'cod'
  const navigate = useNavigate();

  const [data, setdata] = useState({
    firstname: "",
    lastname: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const amount = getTotalCartAmount() * 100;

  const items = food_list
    .filter((product) => cartItems[product._id] > 0)
    .map((product) => `${product.name} X ${cartItems[product._id]}`)
    .join(",");

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const response = await axios.get(url + "/api/order/getuserid", {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "token": token,
          }
        });
        if (response.data.id) {
          setuserid(response.data.id);
        }
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchUserId();
  }, [token, url]);

  const onchangeHandler = (event) => {
    const { name, value } = event.target;
    setdata((prevData) => ({ ...prevData, [name]: value }));
  };

  const generateOrderId = () => {
    const timestamp = new Date().getTime(); // Get the current timestamp
    const randomNumber = Math.floor(Math.random() * 1000000); // Generate a random number
    return `${timestamp}-${randomNumber}`; // Combine them to form the orderId
  };

  const handleCOD = async () => {
    const fulladdress = `${data.street},${data.city},${data.state},${data.country},${data.zipcode}`;
    const orderdata = {
      orderId: generateOrderId(),
      firstname: data.firstname,
      lastname: data.lastname,
      items: items,
      userId: userid,
      amount: getTotalCartAmount() + 2,
      address: fulladdress,
      paymentMethod: 'cod',
    };

    try {
      const response = await axios.post(url + "/api/order/storeorder", orderdata);
      const result = response.data;
      if (result.success) {
        resetcart();
        setcartItems({});
        navigate(`/verify?success=${result.success}&oid=${result.orderId}`);
      } else {
        console.error("Order creation failed:", result);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const proceedtopayment = async (e) => {
    e.preventDefault();

    if (paymentMethod === 'cod') {
      await handleCOD();
    } else if (paymentMethod === 'razorpay') {
      try {
        const response = await axios.get(url + "/api/order/userdata", {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "token": token,
          }
        });

        const user = response.data.user;
        const name = user.name;
        const email = user.email;
        const fulladdress = `${data.street},${data.city},${data.state},${data.country},${data.zipcode}`;
        
        const orderresponse = await axios.post(url + "/api/order/place", {
          amount,
          currency: "INR",
          receipt: "qwsaq1",
        });
        const order = orderresponse.data;
        const oid = order.id;

        const orderdata = {
          firstname: data.firstname,
          lastname: data.lastname,
          items: items,
          userId: userid,
          orderId: oid,
          amount: getTotalCartAmount() + 2,
          address: fulladdress,
          mode:"Online"
        };

        const options = {
          key: "rzp_test_dbM4SCCs9efIxT",
          amount,
          currency: "INR",
          name: "Acme Corp",
          description: "Test Transaction",
          image: "https://example.com/your_logo",
          order_id: order.id,
          handler: async function (response) {
            const body = { ...response };
            const validateRes = await fetch(url + "/api/order/validate", {
              method: "POST",
              body: JSON.stringify(body),
              headers: {
                "Content-Type": "application/json",
              },
            });
            const jsonRes = await validateRes.json();
            console.log(jsonRes);
            const orderdata = jsonRes;
            const orderId = orderdata.orderId;
            console.log("Order id is " + orderId);
            console.log(jsonRes.success);

            const responseorderid = await axios.post(url + "/api/order/ordertableid", { orderId });
            const ordertableid = responseorderid.data;
            if (ordertableid && ordertableid.id) {
              orderdata._id = ordertableid.id;  
            }
            console.log(orderdata);

            const verifypayment = await axios.post(url + "/api/order/verifypayment", { orderdata });
            const res = verifypayment.data;

            if (res.success) {
              console.log("Payment success");
              resetcart();
              setcartItems({});
              navigate(`/verify?success=${res.success}&oid=${orderdata.orderId}`);
            } else {
              console.log("Payment not successful");
            }
          },
          prefill: {
            name: name,
            email: email,
            contact: data.phone,
          },
          notes: {
            address: fulladdress,
          },
          theme: {
            color: "#3399cc",
          },
          payment_method: {
            netbanking: true,
            card: true,
            upi: true,
          },
        };

        const rzp1 = new window.Razorpay(options);
        rzp1.open();

        // Optional: Save orderdata after opening Razorpay
        try {
          const res = await fetch(url + "/api/order/storeorder", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(orderdata),
          }).then((res) => res.json());
          if (res.success) {
            console.log("Order saved successfully");
          }
        } catch (error) {
          console.log("Error saving order:", error);
        }
      } catch (error) {
        console.error("Error:", error);
        // Handle error gracefully
      }
    }
  };

  return (
    <div className='flex justify-between gap-[1rem] mt-[5rem]'>
      <div className="left">
        <form className="delivery-info flex flex-col justify-start items-start gap-2" onSubmit={proceedtopayment}>
          <p className='text-[30px] font-bold mx-4 my-6'>Delivery Information</p>
          <div className="names flex justify-center items-center">
            <input
              required
              placeholder='First name'
              type="text"
              name="firstname"
              className='firstname border p-2 m-1 mx-3 rounded-md border-black'
              onChange={onchangeHandler}
              value={data.firstname}
            />
            <input
              required
              placeholder='Last name'
              type="text"
              name="lastname"
              className='lastname border p-2 mx-3 m-1 border-black rounded-md'
              onChange={onchangeHandler}
              value={data.lastname}
            />
          </div>
          <input
            required
            placeholder='Email address'
            type="email"
            name="email"
            className='w-[95%] email border p-2 mx-3 m-1 border-black rounded-md'
            onChange={onchangeHandler}
            value={data.email}
          />
          <input
            required
            placeholder='Street'
            type="text"
            name="street"
            className='street w-[95%] border p-2 mx-3 m-1 border-black rounded-md'
            onChange={onchangeHandler}
            value={data.street}
          />
          <div className="address">
            <input
              required
              placeholder='City'
              type="text"
              name="city"
              className='city border p-2 mx-3 m-1 border-black rounded-md'
              onChange={onchangeHandler}
              value={data.city}
            />
            <input
              required
              placeholder='State'
              type="text"
              name="state"
              className='state border p-2 mx-3 m-1 border-black rounded-md'
              onChange={onchangeHandler}
              value={data.state}
            />
          </div>
          <div className="more-address">
            <input
              required
              placeholder='Zipcode'
              type="text"
              name="zipcode"
              className='zip border p-2 mx-3 m-1 border-black rounded-md'
              onChange={onchangeHandler}
              value={data.zipcode}
            />
            <input
              required
              placeholder='Country'
              type="text"
              name="country"
              className='country border p-2 mx-3 m-1 border-black rounded-md'
              onChange={onchangeHandler}
              value={data.country}
            />
          </div>
          <input
            required
            placeholder='Phone'
            type="text"
            name="phone"
            className='phone border m-2 mx-3 p-2 border-black rounded-md w-[95%]'
            onChange={onchangeHandler}
            value={data.phone}
          />
          <div className="payment-method">
            <label>
              <input
                type="radio"
                name="paymentMethod"
                value="razorpay"
                checked={paymentMethod === 'razorpay'}
                onChange={handlePaymentMethodChange}
              />
              Razorpay
            </label>
            <label>
              <input
                type="radio"
                name="paymentMethod"
                value="cod"
                checked={paymentMethod === 'cod'}
                onChange={handlePaymentMethodChange}
              />
              Cash on Delivery
            </label>
          </div>

          <button
            type='submit'
            className='m-2 p-2 border bg-red-400 text-white border-none rounded-md'
          >
            Proceed To {paymentMethod === 'cod' ? 'COD' : 'Payment'}
          </button>
        </form>
      </div>
      <div className="right w-[40%] mt-[1rem]">
        <div className="cart-total flex flex-col justify-center items-start w-[100%]">
          <h2 className='text-[25px] font-bold my-2'>Cart Total</h2>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Placeorder;
