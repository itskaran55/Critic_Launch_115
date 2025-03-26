import axios from 'axios';
import React from 'react'
import { ToastContainer, toast, Bounce } from 'react-toastify';

const LeonardoAPI = async (prompt, numImages = 4) => {

    const APIKey = process.env.image_api
    const baseURL = 'https://api.stability.ai/v2beta/stable-image/generate/core';
    try {
        const response = [];

        for (let i = 0; i < numImages; i++) {
            const formData = new FormData();
            formData.append("prompt", prompt);
            formData.append("engine", "stable-diffusion-v1-5"); // Choose the engine you want
            formData.append("steps", "10"); // Number of steps for image generation

            response.push(
                axios.post(baseURL, formData, {
                    headers: {
                        'Authorization': `Bearer ${APIKey}`,
                        "Accept": "application/json",
                        "Content-Type": "multipart/form-data",
                    }
                })
            );           
            console.log("Full API Response:", response.image);
        }
       
        const datas = await Promise.all(response)

        const images = datas.map(res => {
            if (res.data?.image) {
                return `data:image/png;base64,${res.data.image}`; // Ensure proper base64 formatting
            }
            return null;
        }).filter(img => img !== null);

        if (images.length === 0) {
            throw new Error("No image found in response.");
        }

        return images;       
    } catch (error) {
        console.error("Error generating image:", error.response?.data || error);
        toast.error('Something Went Wrong..!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
          });
    }
    return (
        <div>       
         <ToastContainer
         position="top-right"
         autoClose={5000}
         hideProgressBar={false}
         newestOnTop={false}
         closeOnClick={false}
         rtl={false}
         pauseOnFocusLoss
         draggable
         pauseOnHover
         theme="dark"
       //transition={Bounce}
       />
       </div>
    )
}

export default LeonardoAPI
