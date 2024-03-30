import mongoose from "mongoose"
 const userSchema = new mongoose.Schema({
    username:
    {
        type: String,
        required: [true,"PLease Provide a username"],
        unique: true
    },
    email:
    {
        type: String,
        required: [true,"PLease Provide a email"],
        unique: true
    },
    password:
    {
        type: String,
        required: [true,"PLease Provide a password"],
    },
    isVerified:
    {
        type: Boolean,
        default: false
    },
    isAdmin:
    {
        type:Boolean,
        default: false
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String ,
    verifyTokenEpiry: Date
 })


 const User  = mongoose.models.users || mongoose.model("users" , userSchema)

 export default User