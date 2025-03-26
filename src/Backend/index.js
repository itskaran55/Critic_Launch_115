import dotenv from "dotenv"
import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import authRoutes from "./Routes/authRoutes.js"
import imageRoutes from "./Routes/imageRoutes.js"

dotenv.config();
const app = express();

app.use(cors())
// app.use(cors({
//     origin: "http://172.20.10.2:5000",  // Change this to your frontend IP
//     credentials: true 
// }));
app.use(express.json());
app.use(express.json({limit : "50mb"}));
app.use(express.urlencoded({limit : "50mb", extended: true}));

// cloudinary.config({
//     cloud_name : "ddo21layu",
//     api_key : "487781776275833",
//     api_secret : "1IgOm4rD_u0vJLCfDgpd_BosaEs"
// })

// Multer Storage

// const storage = new CloudinaryStorage({
//     cloudinary : cloudinary,
//     params: {
//         folder : "generated_images",
//         format : "png",
//         public_id : (req,file) => Date.now(),
//     },
// });

// const upload = multer({storage: storage})

// DB Connection

mongoose.connect(process.env.MONGODB_URL)
.then(() => console.log("DB Connected Successfully"))
.catch(e => console.log(e));

app.use("/api",authRoutes)
app.use("/api",imageRoutes)

// const port = 5000;
// app.listen(port, () => console.log(`Server is running on ${port}`))

const port = 5000;
app.listen(port, "0.0.0.0", () => {
    console.log(`Server is running on ${port}`);
});
