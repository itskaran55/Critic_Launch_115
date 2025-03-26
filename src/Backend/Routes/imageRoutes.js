import express from 'express';
import imageData from '../Models/images.js';

const router = express.Router();
router.use(express.urlencoded({ extended: true }));

router.post("/saveImage", async (req, res) => {
    try {
        console.log("Received Data from Frontend:", req.body); // Debugging log
        const { userId, prompt } = req.body;

        if (!userId) {
            return res.status(500).json({ error: "User ID and Image URL required" })
        }

        // upload image url

        // const uploadResponse = await cloudinary.uploader.upload(imageUrl, {
        //     folder : "generated_images",
        //     format : "png",
        // });

        const newImage = new imageData({ userId, prompt, createdAt });
        await newImage.save();

        res.status(200).json({ message: "Image Prompt Saved Successfully" })

    } catch (error) {
        res.status(500).json({ message: "Server Error : ", error })
    }
})

export default router;