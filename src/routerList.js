import { BrowserRouter, NavLink, Navigate, Outlet, Route, Routes } from "react-router-dom";
import Login from "./components/login";
import Register from "./components/register";
import User from "./components/user";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from "react";
import axios from 'axios'

function RouterList() {
    axios.defaults.baseURL = 'http://localhost:3001/api';
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('AUTH_TOKEN');
    const [userLogin, setUserLogin] = useState(true)
    useEffect(()=>{
        let IS_LOGGED_IN = localStorage.getItem("IS_LOGGED_IN")
        if(IS_LOGGED_IN === 'true'){
            setUserLogin(true)
        }
        else{
            setUserLogin(false)
        }
    },[])
    const setMessage = (type, message) => {
        if (type == "success") {
            toast.success(message)
        } else {
            toast.error(message)
        }
    }
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout userLogin={userLogin} setUserLogin={setUserLogin} />}>
                    {userLogin ?
                        <>
                            <Route path="/user" element={<User setMessage={setMessage}/>} />
                            <Route path="*" element={<Navigate to="/user" />} />
                        </> :
                        <>
                            <Route path="/login" element={<Login setMessage={setMessage} setUserLogin={setUserLogin} />} />
                            <Route path="/register" element={<Register setMessage={setMessage} />} />
                            <Route path="*" element={<Navigate to="/login" />} />
                        </>
                    }
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

function Layout({ userLogin, setUserLogin }) {
    return (
        <div>
            <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
                <ul className="navbar-nav">
                    {userLogin ?
                        <>
                            <li className="nav-item active">
                                <NavLink className="nav-link" to="/user">User</NavLink>
                            </li>
                            <li className="nav-item active">
                                <a className="nav-link" href="#" onClick={(e)=>{
                                    e.preventDefault()
                                    setUserLogin(false)
                                    localStorage.clear()
                                }}>Logout</a>
                            </li>
                        </> :
                        <>
                            <li className="nav-item active">
                                <NavLink className="nav-link" to="/login">Login</NavLink>
                            </li>
                            <li className="nav-item active">
                                <NavLink className="nav-link" to="/register">Register</NavLink>
                            </li>
                        </>
                    }
                </ul>
            </nav>
            <ToastContainer />
            <Outlet />
        </div>
    );
}

export default RouterList;