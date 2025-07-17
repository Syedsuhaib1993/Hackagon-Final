import { model } from "mongoose";
import { Schema } from "mongoose";

const userSchema = new Schema({
    name:{
        type:String,
    },
    email:{
        type:String,
    },
    image:{
        type:String
    },
    password:{
        type:String,
    },
    number:{
        type:String
    },
    role:{
        type:String,
        default:"User"
    },
    otp:{
        type:String,
    },
    isactive:{
        type:Boolean,
        default:false
    }
})


const User =  model("Users",userSchema)
export default User;