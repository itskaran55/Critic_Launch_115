import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from "framer-motion";
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Navbar = () => {
  const [loggedinUser, setLoggedinUser] = useState(null);
  const [toggleNav, setToggleNav] = useState(true);

  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    if (email) {
      setLoggedinUser(email.split("@")[0]);
    }
  })

  const handleLogout = () => {
    localStorage.removeItem("userEmail")
    localStorage.removeItem("userRole")
    localStorage.removeItem("userId")
  }

  const toggleBtn = () => {
    setToggleNav((prev) => !prev);
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 1.0, delay: 0 / 5 }}
    >
      <div className='navbar flex justify-evenly items-center p-5 bg-black text-white phs:relative'>
        <div className="logo phs:block phs:flex phs:justify-between phs:w-screen phs:items-center">
          <Link to='/'><h1 className='font-bold phs:text-[1.3em]'>CRITIC_LAUNCH_115</h1></Link>
          <button className={`text-white sm:hidden phs-block phs:text-[1.3em]`}
            onClick={toggleBtn}
          >
            <FontAwesomeIcon icon={faBars}></FontAwesomeIcon>
          </button>
        </div>
        {/* <div className="linksandRegister"> */}
        <div className={` ${toggleNav ? 'phs:-translate-x-[350px]' : 'phs:-translate-x-[105px]'} transition-transform duration-500 ease-in-out navLinks shadow-navBox p-2 rounded-r-xl rounded-l-xl phs:absolute phs:top-[70px] phs:z-[9999] phs:h-screen phs:w-[210px] phs:bg-white/5 phs:backdrop-blur-lg phs:text-[1.2em] phs:font-bold`}>
          <ul className='flex gap-4 phs:flex phs:flex-col'>
            <li><a href="">Overview</a></li>
            <li><a href="">Technology</a></li>
            <li><a href="">Resources</a></li>
            <li><a href="">Docs</a></li>
            <li>
              <ul className={`phs:block phs:flex phs:flex-col phs:gap-4 md:hidden`}>
                {loggedinUser ? (
                  <>
                    <li><a>{loggedinUser}</a></li>
                    <li onClick={handleLogout}><a href="">Logout</a></li>
                  </>
                ) : (
                  <Link to="/login">
                    <li><a href="">Get Started</a></li>
                  </Link>
                )}
              </ul>
            </li>
          </ul>
        </div>
        <div className="loginRegisterbtn phs:hidden">
          <ul className='flex gap-4'>
            {loggedinUser ? (
              <>
                <li><a>{loggedinUser}</a></li>
                <li onClick={handleLogout}><a href="">Logout</a></li>
              </>
            ) : (
              <Link to="/login">
                <li><a href="">Get Started</a></li>
              </Link>
            )}
          </ul>
        </div>
        {/* </div> */}
      </div>
    </motion.div>
  )
}

export default Navbar
