import React, { useEffect, useState } from 'react'
import CustomLayout from './Layout/CustomLayout'
import { motion } from "framer-motion";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMicrochip } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

const Login = () => {
    const clientId = "565551626947-mjl8gdc1nsragdlegaqgnbpcn3nvi5vs.apps.googleusercontent.com"
    const navigate = useNavigate();
    const [loggedIn, isLoggedIn] = useState(false);
    const [formData, setFormdata] = useState({
        email: "",
        password: "",
        confirmPassword: ""
    })

    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    })

    const checkLoginStatus = () => {
        isLoggedIn(prevState => !prevState);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormdata((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleChangeLoginData = (e) => {
        const { name, value } = e.target;
        setLoginData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }

    useEffect(() => {
        const user = localStorage.getItem('userRole');
        console.log(user);
        if(user === "Admin") {
            navigate("/Admin/Index");
        }
        else if(user) {
            navigate("/");
        }
    });

    const registration = async (e) => {
        e.preventDefault();
        try {
            const registerEndPoint = "http://localhost:5000/api/register"
            const emailRegularExpression = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
            if (formData.email && !emailRegularExpression.test(formData.email)) {
                toast.error('Please Enter a Valid Email..!', {
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
                return
            }
            const response = await axios.post(registerEndPoint, {
                email: formData.email,
                password: formData.password,
                confirmPassword: formData.confirmPassword
            })          
            if (response.status == 200) {
                const {email, _id ,role} = response.data.accountInfo;
                toast.success('Register Successfully', {
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
                setFormdata({ email: '', password: '', confirmPassword: '' })
                localStorage.setItem("userRole", role)
                localStorage.setItem("userEmail", email)
                localStorage.setItem("userId", _id)
                console.log("Role : ",role)
                navigate("/");
            }
        } catch (e) {
            console.log(`Internal Server Error : ${e}`)
            if (e.response && e.response.status == 400) {
                toast.error(e.response.data.message || "Validation error!", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            }
            else {
                toast.error('Internal Server Error..!', {
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

    const login = async (e) => {
        e.preventDefault();
        try {
            const loginEndPoint = "http://localhost:5000/api/login"
            const emailRegularExpression = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
            if (loginData.email && !emailRegularExpression.test(loginData.email)) {
                toast.error('Please Enter a Valid Email..!', {
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
                return
            }

            const response = await axios.post(loginEndPoint, {
                email: loginData.email,
                password: loginData.password
            })
            // console.log(response.data);
            if (response.status == 200) {
                const {_id,role} = response.data.loggedInfo; //Destructuring
                console.log(response.data.loggedInfo);
                toast.success('Login Successfully', {
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
                setLoginData({ email: '', password: '' })
                localStorage.setItem("userEmail", loginData.email)
                localStorage.setItem("userRole", role)
                localStorage.setItem("userId", _id)
                console.log(response.data.loggedInfo._id);
                console.log(role);
                navigate("/");
            }
        } catch (e) {
            console.log(`Internal Server Error : ${e}`);
            if (e.response && e.response.status == 400) {
                toast.error(e.response.data.message || "Validation error!", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            }
            else {
                toast.error('Internal Server Error..!', {
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
            <section className='flex justify-center items-center phs:z-[-9999]'>
                <div className="sphereAnimation flex justify-center items-center z-[9999] d-flex justify-center items-center absolute z-[1]">
                    <motion.div
                        initial={{ opacity: 0, y: 0 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 0 }}
                        transition={{ duration: 1.0, delay: 2 }}
                    >
                        <video src="/SphereAnimation.mp4" className={`h-[380px] w-[380px] hidden phs:block`} autoPlay loop muted playsInline ></video>
                    </motion.div>
                </div>
                <motion.div
                    initial={{ opacity: 0, y: 0 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -50 }}
                    transition={{ duration: 1.0, delay: 1 }}
                >
                    <div className="icons absolute left-[16%] top-[10%] text-[4rem] phs:text-[3rem] phs:left-[5%]">
                        <FontAwesomeIcon icon={faMicrochip} className='text-white' />
                    </div>
                    <div className="icons absolute right-[16%] bottom-[15%] text-[4rem] phs:text-[3rem] phs:right-[5%]">
                        <FontAwesomeIcon icon={faMicrochip} className='text-[#84bdae]' />
                    </div>
                </motion.div>

                <div className="flex gap-[10%] justify-around items-center mainFrame w-[1100px] h-[530px] bg-white/5 backdrop-blur shadow-designBox3 my-10 rounded-[2%] overflow-hidden z-[100]">
                    <div className="leftSide text-white h-[517px] p-10 flex justify-between items-center z-[9999]">
                        {loggedIn == false && (
                            <motion.div
                                initial={{ x: "500%" }}
                                animate={{ x: "0%" }}
                                transition={{ duration: 1, ease: "easeInOut" }}
                            >
                                <div className={`register relative h-[500px] flex items-center w-[220px] ${loggedIn ? "hidden" : "block"}`}>
                                    <form className='absolute left-10 items-center flex flex-col gap-5 phs:absolute phs:right-[40px]'>
                                        <div className="mainTitle">
                                            <h1 className='text-2xl font-bold'>Registration</h1>
                                        </div>
                                        <div className="email flex flex-col items-start">
                                            <span className="email phs:font-bold">Email : </span>
                                            <input type="text"
                                                value={formData.email}
                                                name="email"
                                                onChange={handleChange}
                                                id="email"
                                                className='text-black p-2'
                                            />
                                        </div>
                                        <div className="email flex flex-col items-start">
                                            <span className="email phs:font-bold">Password : </span>
                                            <input type="password"
                                                value={formData.password}
                                                name="password"
                                                onChange={handleChange}
                                                id="password"
                                                className='text-black p-2'
                                            />
                                        </div>
                                        <div className="email flex flex-col items-start">
                                            <span className="email phs:font-bold">Confirm Password : </span>
                                            <input type="password"
                                                name="confirmPassword"
                                                value={formData.confirmPassword}
                                                onChange={handleChange}
                                                id="confirmpassword"
                                                className='text-black p-2'
                                            />
                                        </div>
                                        <div className="loginNav flex gap-2 phs:w-screen phs:flex phs:items-center phs:justify-center phs:font-bold">
                                            <span>Are you Registered?</span>
                                            <span onClick={checkLoginStatus} className='cursor-pointer'>Login</span>
                                        </div>
                                        <div className='flex gap-3'>
                                            <button onClick={registration} class="bg-white/10 backdrop-blur-md border border-white/20 text-white px-6 py-1 rounded-lg text-lg transition-all duration-300 hover:bg-white/20 hover:shadow-lg phs:text-black phs:bg-white">
                                                Register
                                            </button>
                                            <GoogleOAuthProvider clientId={clientId}>
                                                <GoogleLogin
                                                    onSuccess={(res) => {
                                                        const decoded = jwtDecode(res.credential);
                                                        const user = decoded.email;
                                                        localStorage.setItem("userEmail", JSON.stringify(user))
                                                        if (user) {
                                                            navigate("/");
                                                        }
                                                        console.log(`Login Success : ${res}`)
                                                        toast.success('Login Successfully', {
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
                                                    }}
                                                    onError={(res) => {
                                                        console.log(`Error Occured : ${res}`)
                                                    }}
                                                />
                                            </GoogleOAuthProvider>
                                        </div>
                                    </form>
                                </div>
                            </motion.div>
                        )}
                        {loggedIn && (
                            <motion.div
                                initial={{ x: "-100%" }}
                                animate={{ x: "280%" }}
                                transition={{ duration: 1, ease: "easeInOut" }}
                            >
                                <div className={`login p-5 relative h-[500px] flex items-center w-[260px] absolute right-20 ${loggedIn ? "block" : "hidden"} phs:z-[-9999]`}>
                                    <form action="" className='absolute left-10 items-center flex flex-col gap-5 phs:absolute phs:-translate-x-[709px]'>
                                        <div className="mainTitle">
                                            <h1 className='text-2xl font-bold'>Login</h1>
                                        </div>
                                        <div className="email flex flex-col items-start">
                                            <span className="email phs:font-bold">Email : </span>
                                            <input
                                                type="text"
                                                name="email"
                                                onChange={handleChangeLoginData}
                                                value={loginData.email}
                                                id="email"
                                                className='text-black p-2' />
                                        </div>
                                        <div className="email flex flex-col items-start">
                                            <span className="email phs:font-bold">Password : </span>
                                            <input
                                                type="password"
                                                name="password"
                                                onChange={handleChangeLoginData}
                                                value={loginData.password}
                                                id="password"
                                                className='text-black p-2' />
                                        </div>
                                        <div className="loginNav flex gap-2 phs:font-bold">
                                            <span>Are you New User?</span>
                                            <span onClick={checkLoginStatus} className='cursor-pointer'>Register</span>
                                        </div>
                                        <div>
                                            <button onClick={login} class="bg-white/10 backdrop-blur-md border border-white/20 text-white px-6 py-1 rounded-lg text-lg transition-all duration-300 hover:bg-white/20 hover:shadow-lg phs:text-black">
                                                Login
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </motion.div>
                        )}
                    </div>
                    <div className="rightSide relative phs:hidden">
                        {loggedIn == true && (
                            <>
                                <motion.div
                                    initial={{ opacity: 0, y: 0 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -50 }}
                                    transition={{ duration: 1.0, delay: 1 }}
                                >
                                    <div className={`traingle absolute  bottom-[-50%]  ${loggedIn ? "-rotate-90 right-[-37%]" : "rotate-90 right-[40%]"}`}>
                                        <svg width="1000" height="1000" >
                                            <polygon points="500,0 1000,1000 0,1000" fill="#06070C"
                                                style={{ filter: "drop-shadow(0px 0px 25px #1d6654" }} />
                                        </svg>
                                    </div>
                                </motion.div>
                                <motion.div
                                    initial={{ x: "150%" }}
                                    animate={{ x: "0%" }}
                                    transition={{ duration: 1, ease: "easeInOut" }}
                                >
                                    <div className="image h-[500px] w-[500px] relative ">
                                        <img className={`h-[320px] w-[300px] absolute top-[30%]  ${loggedIn ? "scale-x-[-1] left-[-110%]" : "left-[50%]"}`} src='/Clear AI Login Remove.png'></img>
                                    </div>
                                </motion.div>
                            </>
                        )}
                        {loggedIn == false && (
                            <>
                                <motion.div
                                    initial={{ opacity: 0, y: 0 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -50 }}
                                    transition={{ duration: 1.0, delay: 1 }}
                                >
                                    <div className={`traingle absolute  bottom-[-50%]  ${loggedIn ? "-rotate-90 right-[-37%]" : "rotate-90 right-[40%]"}`}>
                                        <svg width="1000" height="1000" >
                                            <polygon points="500,0 1000,1000 0,1000" fill="#06070C"
                                                style={{ filter: "drop-shadow(0px 0px 25px #1d6654" }} />
                                        </svg>
                                    </div>
                                </motion.div>
                                <motion.div
                                    initial={{ x: "-150%" }}
                                    animate={{ x: "0%" }}
                                    transition={{ duration: 1, ease: "easeInOut" }}
                                >
                                    <div className="image h-[500px] w-[500px] relative ">
                                        <img className={`h-[320px] w-[300px] absolute top-[30%]  ${loggedIn ? "scale-x-[-1] left-[-110%]" : "left-[50%]"}`} src='/Clear AI Login Remove.png'></img>
                                    </div>
                                </motion.div>
                            </>
                        )}
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
                //transition={Bounce}
                />
            </section>
        </CustomLayout>
    )
}

export default Login
