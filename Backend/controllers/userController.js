import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";


const createToken = async (id) => {
    return jwt.sign({ id }, process.env.SECRET_KEY, { expiresIn: '1d' });
  };
//login user
const loginUser = async (req, res) => {

    const {email,password}=req.body;
    try {
        const user=await userModel.findOne({email});
    if(!user)
    {
        return res.json({success:"false",message:"User Does'nt Exist"});
    }
    const isMatch=await bcrypt.compare(password,user.password);
    if(!isMatch)
    {
        return res.json({success:"false",message:"Invalid Credentials"});
    }
    const token=await createToken(user._id);
    res.json({success:"true",token});
    } catch (error) {
        console.log(error);
        res.json({success:"false",message:"Error"});
    }
};



//register user
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  
  try {
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: "false", message: "user already exist" });
    }
    //validating the user email and password
    if (!validator.isEmail(email)) {
      return res.json({ success: "false", message: "Enter valid Email address" });
    }
    //check password length
    if (password.length < 8) {
      console.log("register called");
      return res.json({ success: "false", message: "password minimum length is 8" });
    }

    //hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //creating new user
    const newUser = new userModel({
      name: name,
      email: email,
      password: hashedPassword,
    });

    const user = await newUser.save();
    const token=await createToken(user._id);

    res.json({success:"true",token});
  } catch (error) {
    res.json({ success: "false", message: error.message });
    console.log(error);
  }
};

export { loginUser, registerUser };
