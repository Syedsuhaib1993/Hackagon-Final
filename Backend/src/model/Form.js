import { model, Schema } from "mongoose";


const formSchema = new Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
    message: {
        type: String,
    },
    amount:{
        type:String
    }
})


const Form = model('Forms', formSchema);
export default Form;