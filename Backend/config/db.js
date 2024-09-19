import mongoose from "mongoose";

export const dbconnect=async ()=>{
    await mongoose.connect("mongodb+srv://mayur:mayur123@cluster0.wka9l1y.mongodb.net/FoodWebsite").then(()=>console.log("db connected"));
}