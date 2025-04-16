import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AdminCustomLayout from './Layout/AdminCustomLayout';

const Index = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    const adminUser = localStorage.getItem("userEmail");

    if (!adminUser) {
      navigate('/login');
    }
  })

  // Fetch all Registered Data from Backend API

  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return; // ⛔ Stops second execution
    hasRun.current = true; // ✅ Marks as executed
    setLoading(true);
    const fetchUser = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/allUsers");
        setUsers(response.data);
        console.table(response.data);
        // setLoading(false);
      } catch (e) {
        console.log(`Internal Server Error : ${e}`)
        if (e.response && e.response.status == 500) {
          toast.error(e.response.data.message || "Internal error!", {
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
      finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, [])

  // Delete User

  const deleteUser = async (userId) => {
    console.log("Deleted....")
    try {
      const response = await axios.delete(`http://localhost:5000/api/deleteUser/${userId}`)
      if (response.status == 200) {
        // localStorage.removeItem("userEmail");
        setUsers((prevUsers) => prevUsers.filter(user => user._id != userId));
        toast.success('User Deleted Successfully', {
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
      console.log(`Internal Server Error : ${e}`)
      if (e.response && e.response.status == 500) {
        toast.error(e.response.data.message || "Internal error!", {
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
    <AdminCustomLayout>
      <section className='mainAdminPannel'>
        <div className="AdminPannel flex justify-center items-center flex-col gap-5">
          <div className="title bg-gradient-to-l from-blue-500 to-green-500 text-2xl font-bold text-transparent bg-clip-text">
            All Registered Users
          </div>
          {loading ? (<p className="text-white font-bold">Fetching...</p>)
            : (
              users.length > 0 && (
                <div className="usersData flex justify-center items-center">
                  <table className='bg-white/5 backdrop-blur shadow-designBox3 text-white'>
                    <thead>
                      <tr className="bg-gay-200 text-left">
                        <th className="px-4 border py-2">Id</th>
                        <th className="px-4 border py-2">Email</th>
                        <th className="px-4 border py-2">Role</th>
                        <th className="px-4 border py-2">Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user, index) => (
                        <tr className="hover:bg-gradient-to-l from-blue-500 to-green-500 hover:text-black" key={user.id}>
                          <td className="border py-2 px-4">{index + 1}</td>
                          <td className="border py-2 px-4">{user.email}</td>
                          <td className="border py-2 px-4">{user.role}</td>
                          <td className="border py-2 px-4 cursor-pointer" onClick={() => deleteUser(user._id)}><FontAwesomeIcon icon={faTrashAlt}></FontAwesomeIcon></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )
            )
          }
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
    </AdminCustomLayout>
  )
}

export default Index