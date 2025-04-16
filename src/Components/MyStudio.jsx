import React, { useEffect, useState } from 'react'
import CustomLayout from './Layout/CustomLayout'
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const MyStudio = () => {
    const history = useNavigate()
    const [mySearches, setMySearches] = useState([]);
    const [loading, setLoading] = useState(false);
    const myId = localStorage.getItem('userId');
    const user = localStorage.getItem('userEmail');

    useEffect(() => {
        if (!user) {
            history("/login");
        }
    }, [])

    useEffect(() => {
        const fetchMySearchData = async (uId) => {
            try {
                setLoading(true);
                const response = await axios.get(`http://localhost:5000/api/myData/${uId}`);
                if (response.status == 200) {
                    setMySearches(response.data);
                    console.table(response.data);
                }
            } catch (error) {
                if (error.response && error.response.status == 500) {
                    toast.error(error.response.data.message || "Internal error!", {
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
        fetchMySearchData(myId);
    }, [])

    // Delete my Search

    const deleteMySearch = async (imgId) => {
        try {
            const response = await axios.delete(`http://localhost:5000/api/deleteImage/${imgId}`);
            if (response.status == 200) {
                setMySearches((prevData) => prevData.filter(img => img._id != imgId));
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
        } catch (error) {
            if (error.response && error.response.status == 500) {
                toast.error(error.response.data.message || "Internal error!", {
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
            <section className='mainAdminPannel'>
                <div className="AdminPannel flex justify-center items-center flex-col gap-5">
                    {mySearches && mySearches.length > 0 ? (
                        <>
                            <div className="title bg-gradient-to-l from-blue-500 to-green-500 text-2xl font-bold text-transparent bg-clip-text">
                                All Searches
                            </div>
                            {loading ? (<p className="text-white font-bold">Fetching...</p>)
                                : (
                                    mySearches.length > 0 && (
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
                                                    {mySearches.map((search, index) => (
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
                                                            <td className="border py-2 px-4 cursor-pointer" onClick={() => deleteMySearch(search._id)}><FontAwesomeIcon icon={faTrashAlt}></FontAwesomeIcon></td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    )
                                )}
                        </>

                    ) : (
                        <>
                            <p className="text-center text-gray-500">No search data available.</p>
                            <Link className='text-center text-gray-400' to="/imageGenerating">Want to Generate an Image?</Link>
                        </>
                    )}

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

export default MyStudio
