import mongoose from 'mongoose'

const orderSchema=new mongoose.Schema({
    orderId: { type: String, unique: true, required: true },
    firstname:{type:String,required:true},
    lastname:{type:String,required:true},
    userId:{type:String,required:true},
    items:{type:[String],reqired:true},
    amount:{type:Number,required:true},
    address:{type:Object,required:true},
    status:{type:String,default:"Food Processing"},
    date:{type:Date,default:Date.now},
    mode:{type:String,default:"COD"},
    payment:{type:Boolean,default:false}
});

const orderModel= mongoose.model("order",orderSchema);

export default orderModel;