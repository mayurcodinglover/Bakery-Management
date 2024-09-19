import foodModel from "../models/foodModel.js";
import userModel from "../models/userModel.js";

//addto cart
const addTocart = async (req, res) => {
    try {
        let userData = await userModel.findOne({ _id: req.body.userId });
        let cartData = userData.cartData;
        
        // Ensure cartData is initialized
        if (!cartData) cartData = {};
        
        let productid = req.body.itemId; // Correct destructuring

        // Log product ID for debugging
        console.log("Product ID: ", productid);

        // Check if the product exists
        const product = await foodModel.findById(productid);
        if (!product) {
            return res.json({ success: "false", message: "Product not found" });
        }

        // Check if stock is available
        if (product.stock > 0) {
            // Update the cart data for this product
            if (!cartData[productid]) {
                cartData[productid] = 1;
            } else {
                cartData[productid] = cartData[productid] + 1;
            }

            // Decrement the product stock by 1
            const updatedProduct = await foodModel.findByIdAndUpdate(productid, { $inc: { stock: -1 } }, { new: true });
            console.log("Updated Product: ", updatedProduct);

            // Update the user's cart data
            await userModel.findByIdAndUpdate(req.body.userId, { cartData });

            res.json({ success: "true", message: "Added to cart" });
        } else {
            return res.json({ success: "false", message: "Stock unavailable" });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: "false", message: "Some error occurred" });
    }
};



//remove from cart
const removeFromCart=async (req,res)=>{

    try {
        const userData=await userModel.findById(req.body.userId);
    let cartData=userData.cartData;
    if (!cartData) cartData = {};
        
        let productid = req.body.itemId; // Correct destructuring

        // Log product ID for debugging
        console.log("Product ID: ", productid);

        // Check if the product exists
        const product = await foodModel.findById(productid);
        if (!product) {
            return res.json({ success: "false", message: "Product not found" });
        }

        // Check if stock is available
        if (product.stock > 0) {
            if(cartData[req.body.itemId]>0)
                {
                    cartData[req.body.itemId]-=1;
                }
        }
        const updatedProduct = await foodModel.findByIdAndUpdate(productid, { $inc: { stock: +1 } }, { new: true });
    await userModel.findByIdAndUpdate(req.body.userId,{cartData});
    res.json({success:"true",message:"removed from cart"});
    } catch (error) {
        res.json({success:"false",message:"Some error"})
    }
}

//getcart
const getCart=async (req,res)=>{

    try {
        const userData=await userModel.findById(req.body.userId);
        const cartData=userData.cartData;
        res.json({success:"true",cartData});
    } catch (error) {
        res.json({success:"false",message:"Error"});
    }
}

export {addTocart,removeFromCart,getCart};