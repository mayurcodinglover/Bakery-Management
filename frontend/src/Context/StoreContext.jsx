import axios from "axios";
import { createContext, useContext, useState, useEffect } from "react";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setcartItems] = useState({});
  const [token, settoken] = useState("");
  const [food_list, setfoodlist] = useState([]);
  const [review, setreview] = useState([]);
  const url = "http://localhost:3000";
  const [user, setuser] = useState('');

  const addToCart = async (itemId) => {
    console.log(itemId);
    if (!cartItems || !cartItems[itemId]) {
      console.log(itemId);
      setcartItems((prev) => {
        return { ...prev, [itemId]: 1 };
      });
    } else {
      setcartItems((prev) => {
        return { ...prev, [itemId]: cartItems[itemId] + 1 };
      });
    }
    if (token) {
      await axios.post(url + "/api/cart/add", { itemId }, { headers: { token } });
    }
  };

  const fetchUser = async (token) => {
    try {
      if (token) {
        console.log("Fetching user with token:", token);
        const response = await axios.get(url + "/api/review/getuser", {
          headers: { token }
        });
        console.log("User data:", response.data.user);
        setuser(response.data.user);
      } else {
        console.log("Token not available, user fetch skipped");
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const fetchReviews = async () => {
    const response = await axios.get(url + "/api/review/getreview");
    console.log(response.data.review);
    setreview(response.data.review);
  };

  const addReview = async ({ productId, rating, review }) => {
    try {
      if (token) {
        const res = await axios.post(url + "/api/review/addreview", { productId, rating, review }, { headers: { token } });

        console.log(res);

        if (res.data.success === true) {
          alert("review added");
        } else {
          alert("review is not added");
        }
      }
    } catch (error) {
      alert("error in above code");
    }
  };

  const fetchFoodList = async () => {
    const response = await axios.get(url + "/api/food/list");
    setfoodlist(response.data.data);
  };

  const removeFromCart = async (itemId) => {
    setcartItems((prev) => ({ ...prev, [itemId]: cartItems[itemId] - 1 }));
    if (token) {
      await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } });
    }
  };

  const loadCartData = async (token) => {
    try {
      const response = await axios.post(url + "/api/order/getcart", {}, {
        headers: { token }
      });
      console.log(response.data.cartData);
      setcartItems(response.data.cartData);
    } catch (error) {
      console.error("Error loading cart data:", error);
    }
  };

  const getTotalCartAmount = () => {
    let Totalcart = 0;
    for (let i in cartItems) {
      if (cartItems[i] > 0) {
        const foodinfo = food_list.find((product) => { return product._id === i });
        Totalcart += foodinfo.price * cartItems[i];
      }
    }
    return Totalcart;
  };

  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      console.log("fetch food called");
      settoken(localStorage.getItem("token"));
      fetchUser(localStorage.getItem("token"));
      loadCartData(localStorage.getItem("token"));
    }
    loadData();
  }, []);

  const resetcart = async () => {
    try {
      console.log("inside try");
      const response = await axios.post(
        url + "/api/order/resetcart",
        {},
        { headers: { token: token } }
      );

      if (response.data.status === "true") {
        console.log("reset");
        alert("reset");
      } else {
        console.log("error");
        alert("some error");
      }
    } catch (error) {
      console.error("Error resetting cart:", error);
      alert("some error");
    }
  };

  const contextValue = {
    food_list,
    cartItems,
    url,
    token,
    review,
    user,
    addToCart,
    removeFromCart,
    setcartItems,
    getTotalCartAmount,
    settoken,
    resetcart,
    addReview,
    fetchReviews,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
