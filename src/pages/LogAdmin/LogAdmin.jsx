import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import backImg from "../../assets/img/about/5.jpg"
import user from "../../assets/img/img_avatar.png"
import "./LogAdmin.css"

const LogAdmin = () => {
    const [userDetails, setUserDetails] = useState({
        email: "",
        password: ""
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setUserDetails({ ...userDetails, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { email, password } = userDetails;

        const res = await fetch("http://localhost:8080/logAdmin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email, password
            })
        })

        const result = await res.json();
        const statusCode = res.status;

        localStorage.setItem("adminToken", result.token);
        console.log(result.token);

        if (statusCode === 422) {
            toast.error('Please Enter all Fields !!!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else if (statusCode === 404 || !result) {
            toast.error('Invalid Credentials !!!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else {
            toast.success('Login Successful', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

            navigate("/", {replace: true})

        }
    }

    return (
        <>

            <img src={backImg} className="logAdmin-back-image" alt="back-image" />

            <div className="logAdmin-form-content">
                <img src={user} className="logAdmin-user-logo" alt="userImage" />
                <form method="post" className="inputs" onSubmit={handleSubmit}>
                    <h2>Login Here</h2>

                    <div className="username">
                        <div className="logo">
                            <i class="fa fa-user"></i>
                        </div>
                        <input type="text" name="email" id="email" placeholder="Enter Your Email" onChange={handleChange} autoComplete="off" />
                    </div>

                    <div className="password">
                        <div className="logo">
                            <i class="fa fa-unlock-alt"></i>
                        </div>
                        <input type="password" name="password" id="password" placeholder="Enter Your Password" onChange={handleChange} autoComplete="off" />
                    </div>
                    <div className="alreadyuser">
                        <a href="/addadmin" className="userLink">Create Account</a>
                    </div>

                    <button type="submit" className="login-btn">Login</button>
                    <ToastContainer />
                </form>
            </div>
        </>
    )
}

export default LogAdmin