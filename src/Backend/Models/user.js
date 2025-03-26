import mongoose, { Schema } from "mongoose";

const userSchema = new Schema( {
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    role : {
        type : String,
        enum: ['User','Admin'],
        default : 'User'
    }
} )

const userData = mongoose.model("User",userSchema)

// module.exports = userData
export default userData; //Correct ES Module export 