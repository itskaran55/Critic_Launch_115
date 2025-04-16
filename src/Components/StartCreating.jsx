import React, { useEffect, useState } from 'react'
import CustomLayout from './Layout/CustomLayout'
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import LeonardoAPI from '../API/LeonardoAPI';

const StartCreating = () => {
  const history = useNavigate()

  const user = localStorage.getItem('userEmail');
  const userId = localStorage.getItem('userId');
  useEffect(() => {

    if (!user) {
      history('/');
    }
  }, [history])  // Run this only when `history` changes

  const [prompt, setPrompt] = useState("")
  const [imgURL, setImgURL] = useState("");
  const [loading, setLoading] = useState(false);
  const [base64Image, setBase64Image] = useState(false);

  const handleGenerate = async () => {
    console.log("Clicked..!")

    if (!prompt.trim()) {
      return toast.error('Please Enter a Prompt..!', {
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
    else {
      setLoading(true)
      try {
        const data = await LeonardoAPI(prompt, 4);

        if (data) {
          console.log(data[0])
          setLoading(false)
          setBase64Image(data)
          setImgURL(data)

          if (data && data.length > 0) {
            try {
              const imageEndPoint = "http://localhost:5000/api/saveImage";

              console.log("Sending Data:", {
                userId: userId,
                userEmail: user,
                prompt,
                createdAt: Date.now()
              });

              const response = await axios.post(imageEndPoint, {
                userId: userId,
                userEmail: user,
                prompt: prompt,
                createdAt: new Date(Date.now()).toISOString()
              })

              if (response.status == 200) {
                toast.success('Image Saved Successfully', {
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
              else {
                toast.error('Failed to Save Image..!', {
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
            } catch (e) {
              console.log(`Internal Server Error : ${e}`);
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
            // finally { //if we dont clear state it will saved previous output even if fail to generate
            //   setBase64Image(false);
            // }
          }
        }
        else {
          toast.error('Failed to Generate Image..!', {
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
      } catch (e) {
        console.log(`Internal Server Error : ${e}`);
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
    }
  }

  return (
    <CustomLayout>
      <div className='text-white relative h-screen overflow-hidden my-10 flex flex-col gap-5'>

        <div className="mainTitleDescrption flex flex-col gap-2">
          <h1 className='text-5xl bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent h-[104px] font-bold phs:text-[2rem]'>
            Create Artistic Images with <br />
            Artificial Intelligence
          </h1>
          <p className='phs:text-[1.1rem]'>"Transform your ideas into stunning art with AI magic, powered by Stability API!"</p>
        </div>
        <div className="searchBTN flex justify-center items-center">
          <form action="" className='flex gap-5 phs:flex phs:flex-col'>
            <div className="inputField">
              <textarea type="text"
                onChange={(e) => setPrompt(e.target.value)}
                className='p-2 w-[400px] text-black rounded-lg resize-none min-h-[100px] max-h-[400px] overflow-y-auto'
                name="imgPropmpt"
                placeholder='Enter Your Creative Prompt'
              />
            </div>
            <div className="generateImages flex justify-center items-center font-bold">
              <a className='bg-gradient-to-r from-blue-500 to-green-500 h-10 p-5 flex justify-center items-center bg-clip-text text-transparent cursor-pointer'
                onClick={handleGenerate}
              >{loading ? "Generating..." : "CRAFT YOUR VISION"}</a>
            </div>
          </form>
        </div>
        <div className="images">
          {/* {base64Image && ( */}
          <div className="mt-4 flex justify-center items-center gap-10">
            {base64Image.length > 0 && base64Image.map((img, index) => (
              <img key={index} src={`${img}`} alt={`Generated ${index}`} className='rounded-lg shadow-lg h-[300px] w-[300px]' />
            ))}
          </div>
        </div>
      </div>
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
      />
    </CustomLayout>
  )
}

export default StartCreating
