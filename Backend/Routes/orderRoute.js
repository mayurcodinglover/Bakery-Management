import { getallProduct, getcartData, placeOrder ,resetCart,getuserId,getuserData,validateOrder,storeOrder,verifyPayment,ordertableid, userOrders,getAllOrder,userData,orderStatus} from "../controllers/orderController.js";
import express from 'express';
import authMiddleware from "../middlewares/auth.js";

const orderRouter=express.Router();

orderRouter.post("/place",placeOrder);
orderRouter.get("/allproduct",getallProduct);
orderRouter.post("/getcart",authMiddleware,getcartData);
orderRouter.post("/resetcart",authMiddleware,resetCart);
orderRouter.get("/getuserid",authMiddleware,getuserId);
orderRouter.get("/userdata",authMiddleware,getuserData);
orderRouter.post("/validate",validateOrder)
orderRouter.post("/storeorder",storeOrder);
orderRouter.post("/verifypayment",verifyPayment);
orderRouter.post("/ordertableid",ordertableid);
orderRouter.post("/userorder",authMiddleware,userOrders);
orderRouter.get("/getallorder",getAllOrder);
orderRouter.post("/getuserdata",userData);
orderRouter.post("/updatestatus",orderStatus);



export default orderRouter;