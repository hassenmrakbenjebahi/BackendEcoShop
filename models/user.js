// import monggose module
import mongoose from "mongoose";
// create Match Schema
const userSchema = mongoose.Schema({
    name: String,
    email: String,
    //pwd: String,
    phone: String,
})

const user = mongoose.model("User", userSchema);
export default user;