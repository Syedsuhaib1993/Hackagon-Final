import mongoose from "mongoose";



const ConnectDB =async ()=>{
    try {
        const connect = await mongoose.connect(process.env.MONGODB_URI)
        console.log('MongooDB Connected');
        
    } catch (error) {
        console.log(error.message);
        
    }
}
export default ConnectDB;