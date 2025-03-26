import mongoose, { Schema } from "mongoose";

const imageSchema = new Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    imageUrl : {
        type : String,
        required : true
    },
    prompt : {
        type : String
    },
    createdAt : {
        type : Date,
        default : Date.now
    }
})

const imageData = mongoose.model("Image", imageSchema)

export default imageData;