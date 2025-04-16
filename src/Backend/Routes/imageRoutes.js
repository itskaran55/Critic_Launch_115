import express from 'express';
import imageData from '../Models/images.js';

const router = express.Router();
router.use(express.urlencoded({ extended: true }));

router.post("/saveImage", async (req, res) => {
    try {
        console.log("Received Data from Frontend:", req.body); // Debugging log
        const { userId, userEmail, prompt } = req.body;
        const createdAt = new Date().toISOString();

        if (!userId) {
            return res.status(500).json({ error: "User ID and Image URL required" })
        }

        const newImage = new imageData({ userId, userEmail, prompt, createdAt });
        await newImage.save();

        res.status(200).json({ message: "Image Prompt Saved Successfully" })

    } catch (error) {
        res.status(500).json({ message: "Server Error : ", error })
    }
});

// Fetch all Saved Image Data

router.get("/allImageData", async (req, res) => {
    try {
        const allsavedImageData = await imageData.find();
        res.status(200).json(allsavedImageData);
        // res.status(200).json({message : "Data Fetched Successfully"}) it gives me error because API sends 2 request from backend and its crash.
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error : ", error })
    }
})

// Delete Saved Image Data

router.delete("/deleteImage/:id", async (req, res) => {
    try {
        const imageId = req.params.id;
        const image = await imageData.findByIdAndDelete(imageId);

        if (!image) {
            return res.status(400).json({ message: "Image not Found..!" })
        }

        res.status(200).json({ message: "Image Data Deleted Successfully.." })
    } catch (e) {
        res.status(500).json({ message: `Inteenal Server Error : ${e}` })
    }
})

export default router;

// Fetch Only Images data through UserId for Specific User only

router.get("/myData/:id", async (req,res) => {
    try {
        const uId = req.params.id;
        const userImageData = await imageData.find({userId : uId});

        if(!userImageData) {
            return res.status(400).json({message : "You have not any Searches data"})
        }

        res.status(200).json(userImageData);
    } catch (error) {
        console.log(`Internal Server Error : ${error}`);
        res.status(500).json({message : `Internal Server Error : ${error}`});
    }
})