import userModel from "../models/userModel.js";
import foodModel from "../models/foodModel.js";
import reviewModel from "../models/reviewModel.js";
import { v4 as uuidv4 } from "uuid";

const addreview = async (req, res) => {
  try {
    const { productId, rating, review } = req.body;
    const userId = req.body.userId;
    const reviewId = uuidv4();

    console.log(productId, rating, review, userId);

    const review1 = reviewModel({
      reviewId: reviewId,
      userId: userId,
      productId: productId,
      rating: rating,
      review: review,
    });
    await review1.save();
    res
      .status(201)
      .json({ success: true, message: "Review Added Successfully" });
    console.log("down");
  } catch (error) {
    console.log("catch down");
    res.status(500).json({ success: false, message: "error.message" });
  }
};

const fetchReview = async (req, res) => {
  try {
    const review = await reviewModel.find({});
    console.log(review);
    
    if (review) {
      res.json({ success: true, review: review });
    } else {
      res.json({ success: false, message: "review not found" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error in the review fetchinge" });
  }
};

const fetchuser=async (req,res)=>{
    try {
        const user=await userModel.find({_id:req.body.userId})
        console.log(user);

        if(user){
            res.json({success:true,user:user});
        }
        else{
            res.json({success:false,message:"user not found"})
        }
    } catch (error) {
        res.json({success:false,message:"some error in fetching"})
    }
}

const deletereview=async (req,res)=>{
    try {
        const del=await reviewModel.findByIdAndDelete({_id:req.body.reviewid})
        console.log(del);
        if(del)
        {
            res.json({success:true,message:"review deleted successfully"});
        }
        else{
            res.json({success:false,message:"review not deleted successfully"});
        }
    } catch (error) {
        res.json({success:false,message:"Error in deleting the review"});
    }
}

export { addreview, fetchReview ,fetchuser,deletereview};
