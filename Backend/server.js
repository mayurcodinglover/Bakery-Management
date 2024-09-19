import express from "express";
import cors from "cors";
import { dbconnect } from "./config/db.js";
import foodRouter from "./Routes/foodRoute.js";
import userRouter from "./Routes/userRoute.js";
import "dotenv/config"
import cartRouter from "./Routes/cartRoute.js";
import orderRouter from "./Routes/orderRoute.js";
import reviewRouter from "./Routes/reviewRoute.js";

//app config
const app=express();
const port=3000;

//middleware
app.use(express.json());
app.use(cors());

//apiEndpoint
app.use("/api/food",foodRouter)
app.use("/images",express.static("upload"));
app.use("/api/user",userRouter);
app.use("/api/cart",cartRouter);
app.use("/api/order",orderRouter);
app.use("/api/review",reviewRouter);

//db connection
dbconnect();

app.get("/",(req,res)=>{
    res.send("Hello World");
})

app.listen(port,(req,res)=>{
    console.log(`server started on port http://localhost:${port}`);
})

//mongodb+srv://mayur:<password>@cluster0.wka9l1y.mongodb.net/?