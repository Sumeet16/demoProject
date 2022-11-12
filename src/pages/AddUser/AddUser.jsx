import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import backImg from "../../assets/img/about/5.jpg"
import user from "../../assets/img/img_avatar.png"
import { useSearchParams } from 'react-router-dom';
import "./AddUser.css";

const AddUser = () => {
    const [searchParams] = useSearchParams();
    const [userDetails, setUserDetails] = useState({
        username: "",
        email: "",
        password: "",
        code: "",
        phone: ""
    });

    const id = searchParams.get("refer")

    const [code, setCode] = useState([]);
    const [userCode, setUserCode] = useState();

    const [check, setCheck] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchCode = async () => {
            const res = await fetch("https://gist.githubusercontent.com/anubhavshrimal/75f6183458db8c453306f93521e93d37/raw/f77e7598a8503f1f70528ae1cbf9f66755698a16/CountryCodes.json");
            const result = await res.json();

            if (!result) {
                console.log("No Data");
            }

            setCode([result])
        }

        fetchCode();
    }, [])

    const handleChange = (e) => {
        setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
    }

    const dropdownChange = (e) => {
        setUserCode(e.target.value);
        setUserDetails({ code: userCode })
    }

    const handleCheckChange = (e) => {
        if (e.target.checked) {
            setCheck(true);
        } else {
            console.log("not");
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(userDetails)

        const { username, email, password, code, phone } = userDetails;

        const res = await fetch("http://localhost:8080/registerUser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username, email, password, code, phone
            })
        })
        

        const result = await res.json();
        const statusCode = res.status;

        if (check == false) {
            toast.error('Please Agree to our Terms and Conditions !!!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        else if (statusCode == 500) {
            toast.error('Please Enter all Fields !!!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else if (statusCode == 404 || !result) {
            toast.error('Error Occurred !!!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else {
            navigate("/verify", { replace: true })
        }
    }

    return (
        <>
            <img src={backImg} className="login-back-image" alt="back-image" />
            <div className="user-form-content">
                <form method="post" className="inputs" onSubmit={handleSubmit}>

                    <h2>Register Yourself</h2>
                    <div className="inputContainer">
                        <div className="username">
                            <div className="logo">
                                <i class="fa fa-user"></i>
                            </div>
                            <input type="text" name="username" id="username" placeholder="Enter Your Username" onChange={handleChange} autoComplete="off" />
                        </div>

                        <div className="username">
                            <div className="logo">
                                <i class="fa fa-envelope"></i>
                            </div>
                            <input type="text" name="email" id="email" placeholder="Enter Your Email" onChange={handleChange} autoComplete="off" />
                        </div>

                        <div className="password">
                            <div className="logo">
                                <i class="fa fa-unlock-alt"></i>
                            </div>
                            <input type="password" name="password" id="password" placeholder="Enter Your Password" onChange={handleChange} autoComplete="off" />
                        </div>
                        <div className="contact">
                            <div className="contact-group">
                                <div className="logo">
                                    <i class="fa fa-phone"></i>
                                </div>
                                <div>
                                    <select name="code" onChange={handleChange}>
                                        <option value="Select Phone Code">Select Phone Code</option>
                                        {
                                            code.map((element) => {
                                                return element.map((item) => {
                                                    return (
                                                        <option value={item.dial_code}>{item.dial_code}</option>
                                                    )
                                                })
                                            })
                                        }

                                    </select>
                                </div>
                                <input type="number" name="phone" id="phone" placeholder="Enter Your Phone" onChange={handleChange} autoComplete="off" />
                            </div>
                        </div>
                        <div className="check">
                            <input type="checkbox" onChange={handleCheckChange} /> <a href="/terms&condition">Terms and Condition</a>
                        </div>
                        <div className="alreadyuser">
                            <a href="/loguser" className="userLink">Already a User</a>
                        </div>

                        <button type="submit" className="login-btn">Register</button>
                        <ToastContainer />
                    </div>

                </form>
            </div>
        </>
    )
}

export default AddUser