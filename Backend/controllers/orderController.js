import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import foodModel from "../models/foodModel.js";
import stripe from "stripe";
import Razorpay from "razorpay";
import crypto from 'crypto'

const placeOrder = async (req, res) => {
  try {
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_ID_KEY,
      key_secret: process.env.RAZORPAY_SECRET_KEY,
    });

    const options = req.body;
    const order = await razorpay.orders.create(options);

    if (!order) {
      return res.status(500).send("Error");
    }
    res.json(order);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error");
  }
};

const getallProduct = async (req, res) => {
  const product = await foodModel.find({});
  try {
    res.send(product);
  } catch (error) {
    res.send(error);
  }
};

const getcartData = async (req, res) => {
  const userdata = await userModel.findOne({ _id: req.body.userId });
  res.json({cartdata:userdata.cartData});
};

const resetCart = async (req, res) => {
  try {
    // Find the user by userId
    const userdata = await userModel.findById(req.body.userId);

    if (!userdata) {
      return res.status(404).json({ status: "error", message: "User not found" });
    }

    // Initialize an empty cart
    userdata.cartData = {};

    // Save the updated user data
    await userdata.save();

    res.json({ status: "true", message: "Cart reset successfully" });
  } catch (error) {
    console.error("Error resetting cart:", error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};


//end point for fetch order details
const getuserId = async (req, res) => {
  res.json({ id: req.body.userId });
};

//get userdata
const getuserData = async (req, res) => {
  const user = await userModel.findOne({ _id: req.body.userId });
  console.log(user);
  res.json({user:user});
};

const validateOrder = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =req.body;

  const sha = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET_KEY);
  sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
  const digest = sha.digest("hex");
  if (digest !== razorpay_signature) {
    return res.status(400).json({ msg: "Transaction is not legal!" });
  }
  res.json({
    success: true,
    orderId: razorpay_order_id,
    paymentId: razorpay_payment_id,
  });
};

//get request for get _id of order table based on order id
const ordertableid = async (req, res) => {
  try {
    const {orderId} = req.body;

    if (orderId) {
      const order = await orderModel.findOne({ orderId: orderId });
      if (order) {
        return res.json({ id: order._id });
      } else {
        return res.status(404).json({ success: "false", message: "Order not found" });
      }
    } else {
      return res.status(400).json({ success: "false", message: "Order ID not provided" });
    }
  } catch (error) {
    console.error("Error in ordertableid:", error);
    return res.status(500).json({ success: "false", message: "Some error occurred" });
  }
};


const storeOrder=async (req,res)=>{
        const order=new orderModel({
            firstname:req.body.firstname,
            lastname:req.body.lastname,
            orderId:req.body.orderId,
            userId:req.body.userId,
            items:req.body.items,
            amount:req.body.amount,
            address:req.body.address,
            mode:req.body.mode
        });
        console.log(req.body.firstname);
        console.log(req.body.lastname);
        console.log(req.body.orderId);
        

        
        await order.save();
        res.send({success:true,message:"order stored"})
}

//api for verify payment
const verifyPayment = async (req, res) => {
  try {
    console.log(req.body.orderdata);
    const {_id,orderId, success } = req.body.orderdata;
    console.log(_id,orderId,success);
    if (success && orderId) {
      const updateResult = await orderModel.findByIdAndUpdate(_id, { payment: success});

      if (updateResult) {
        return res.send({ success: true, message: "Payment verified" });
      } else {
        return res.send({ success: false, message: "Not verified" });
      }
    } else {
      return res.send({ success: false, message: "Payment not successful" });
    }
  } catch (err) {
    console.error("Error verifying payment:", err);
    return res.status(500).send({ success: false, message: "Internal Server Error" });
  }
};

const userOrders=async(req,res)=>{
  console.log(req.body.userId);
  const orders=await orderModel.find({userId:req.body.userId });
  console.log(orders);

  try {
    if(orders)
    {
      res.json({success:"true",order:orders});
    }
  } catch (error) {
    res.json({success:"false",message:"order not displayed"});
  }
}

const getAllOrder=async(req,res)=>{
  try {
    const orders=await orderModel.find({});
    if(orders)
    {
      res.json({success:"true",data:orders});
    }
    else{
      res.json({success:"false",message:"no orders found"});
    }
  } catch (error) {
    res.json({success:"false",message:"some error"});
  }
}

const userData=async(req,res)=>{
  const {userId}=req.body;
  try {
    const userdata=await userModel.find({_id:userId});
    res.json({success:"true",data:userdata});
  } catch (error) {
    res.json({success:"false",message:"error in getting data"});
  }
}

//update order status

const orderStatus=async (req,res)=>{
    try {
      console.log(req.body.orderId);
      console.log(req.body.status);
      
      await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status});
      res.json({success:true,message:"Status Updated"});
    } catch (error) {
      console.log(error);
      res.json({success:false,message:"Error "})
    }
}

export {
  placeOrder,
  getallProduct,
  getcartData,
  resetCart,
  getuserId,
  getuserData,
  validateOrder,
  storeOrder,
  verifyPayment,
  ordertableid,
  userOrders,
  getAllOrder,
  userData,
  orderStatus
};
