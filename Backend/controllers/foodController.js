import foodModel from "../models/foodModel.js";
import fs from 'fs'

const addFood=async (req,res)=>{

    let image_filename=`${req.file.filename}`;

    const food=new foodModel({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        category:req.body.category,
        stock:req.body.stock,
        image:image_filename,
    })
    try{
        await food.save();
        res.status(200).json({success:"true",message:"food added successfully"})
    }
    catch(error)
    {
        console.log(error);
        res.json({success:"false",message:"Error"});
    }
}

//List allfood items
const listFood=async (req,res)=>{
    
    try
    {
        const foods=await foodModel.find({});
        res.json({success:"true",data:foods});
    }
    catch(erorr)
    {
        console.log(error);
        res.json({success:"false",error:"Failed"});
    }
}

//remove food items
const removeFood=async (req,res)=>{
    try{
        const foods=await foodModel.findById(req.body.id);
        fs.unlink(`upload/${foods.image}`,()=>{});

        await foodModel.findByIdAndDelete(req.body.id);
        res.json({success:"true",message:"food removed successfully"});
    }
    catch(error)
    {
        console.log(error);
        res.json({success:"false",message:"Failed"});
        
    }
}
const getStock=async(req,res)=>{
    try {
        const foodid=req.body.id;
        const food=await foodModel.findById(foodid);
        res.json({success:"true",data:food.stock});
    } catch (error) {
        console.log(error);
        res.json({success:"false",message:"Failed"});
    }
}

export {addFood,listFood,removeFood,getStock}