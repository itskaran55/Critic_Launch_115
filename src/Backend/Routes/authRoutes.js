import express from "express";
import userData from "../Models/user.js";
import b from "bcryptjs"

const router = express.Router();

router.post("/register", async (req,res) => {
    try {
        const {email, password, confirmPassword} = req.body;

        if(!email || !password || !confirmPassword) {
            return res.status(400).json({message : "All Fields are Required"});
        }

        const emailRegularExpression = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        if(email && !emailRegularExpression.test(email)) {
            return res.status(400).json({message : "Please Enter a Valid Email Format"})
        }


        if(password != confirmPassword) {
            return res.status(400).json({message : "Please Enter Same Passwords"});
        }
         

        const existingUser = await userData.findOne({email});

        if(existingUser) {
            return res.status(400).json({message : "User Already Exists"});
        }

        const saltValue = 5;
        const hashPassword = await b.hash(password, saltValue);

        const newUser = new userData({email, password: hashPassword, role : "User"})
        await newUser.save()

        res.status(200).json({
            message : "User Registered Successfully",
            accountInfo : {email : newUser.email, _id : newUser._id ,role : newUser.role}
        })


    } catch (error) {
        res.status(500).json({message : "Server Error", error})
    }
})

// Login Route

router.post("/login", async(req,res) => {
    try {
        const {email, password} = req.body;
        if(!email || !password) {
            return res.status(400).json({message : "All Fields are Required"});
        }

        const emailRegularExpression = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        if(email && !emailRegularExpression.test(email)) {
            return res.status(400).json({message : "Please Enter a Valid Email Format"})
        }

        const existingUser = await userData.findOne({email});
        console.log(existingUser.role);

        if(!existingUser) {
            return res.status(400).json({message : "Please Register your-self First..!"});
        }

        const isPasswordCompare = await b.compare(password,existingUser.password)

        if(!isPasswordCompare) {
            return res.status(400).json({ message: "Wrong Password! Please try again." });
        }

        res.status(200).json({ 
            message: "Login Successfully",
            loggedInfo : {
                _id : existingUser._id,
                role : existingUser.role
            }
         });

    } catch (error) {
        res.status(500).json({message : "Server Error : ", error : error.message})
    }
})

// fetch all Registered Data

router.get("/allUsers", async (req,res) => {
    try {
        const allRegisteredData = await userData.find();
        res.json(allRegisteredData);
    } catch (error) {
        res.status(500).json({message : "Server Error : ", error : error.message})
    }
})

// Delete Records

router.delete("/deleteUser/:id", async (req,res) => {
    try {
        console.log(req.params);
        const userId = req.params.id;
        const user = await userData.findByIdAndDelete(userId);

        if(!user) {
            return res.status(404).json({message : "User Not Found"})
        }

        res.status(200).json({message : "User Deleted Successfully"})
    } catch (e) {
        res.status(500).json({message : "Server Error : ", error : e.message})
    }
})

export default router;