import React, { useEffect, useRef, useState } from 'react'
import AdminCustomLayout from './Layout/AdminCustomLayout'
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Searches = () => {
    const [loading, setLoading] = useState(false);
    const [searches, setSearches] = useState([]);

    const navigate = useNavigate();
    useEffect(() => {
        const adminUser = localStorage.getItem("userEmail");

        if (!adminUser) {
            navigate('/login');
        }
    })

    const hasRun = useRef(false);
    useEffect(() => {
        if (hasRun.current) return;
        hasRun.current = true;
        setLoading(true)
        const fetchallSearches = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/allImageData");

                if (response.status == 200) {
                    console.table(response.data);
                    setSearches(response.data);
                }
            } catch (e) {
                console.log(`Internal Server Error : ${e}`);
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
        fetchallSearches();
    }, [])

    // Delete Searches
    const deleteUser = async (imageId) => {
        try {
            const response = await axios.delete(`http://localhost:5000/api/deleteImage/${imageId}`)
            if (response.status == 200) {
                setSearches((prevSearches) => prevSearches.filter(img => img._id != imageId));
                toast.success('Image Data Deleted Successfully', {
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
                        All Searches
                    </div>
                    {loading ? (<p className="text-white font-bold">Fetching...</p>)
                        : (
                            searches.length > 0 && (
                                <div className="usersData flex justify-center items-center">
                                    <table className='bg-white/5 backdrop-blur shadow-designBox3 text-white'>
                                        <thead>
                                            <tr className="bg-gay-200 text-left">
                                                <th className="px-4 border py-2">Id</th>
                                                <th className="px-4 border py-2">Prompt</th>
                                                <th className="px-4 border py-2">Created By</th>
                                                <th className="px-4 border py-2">Created At</th>
                                                <th className="px-4 border py-2">Delete</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {searches.map((search, index) => (
                                                <tr className="hover:bg-gradient-to-l from-blue-500 to-green-500 hover:text-black" key={search.id}>
                                                    <td className="border py-2 px-4">{index + 1}</td>
                                                    <td className="border py-2 px-4">{search.prompt}</td>
                                                    <td className="border py-2 px-4">{search.userEmail || "NULL"}</td>
                                                    <td className="border py-2 px-4">
                                                        {new Date(search.createdAt).toLocaleString('en-GB', {
                                                            day: '2-digit',
                                                            month: '2-digit',
                                                            year: 'numeric',
                                                            hour: '2-digit',
                                                            minute: '2-digit',
                                                            hour12: true
                                                        })}
                                                    </td>
                                                    <td className="border py-2 px-4 cursor-pointer" onClick={() => deleteUser(search._id)}><FontAwesomeIcon icon={faTrashAlt}></FontAwesomeIcon></td>
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

export default Searches
