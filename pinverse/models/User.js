import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
    {
        username:String,
        email:String,
        image:String,
        password:String,
    },
    {
        timstamps:true,
    }
);
export default mongoose.models.User || mongoose.model("User", userSchema);