import React, { useState } from "react";
import Headers from "../../components/Header/Header"
import Footer from "../../components/Footer/Footer"
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const VerifyPin = () => {
    const [otp, setOtp] = useState();
    const navigate = useNavigate();

    const handleChange = (event) => {
        setOtp(event.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch("http://localhost:8000/verifypin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                otp
            })
        });

        const result = await res.json();
        const status = res.status;
        console.log(result);
        console.log(status);
        if (status == 500) {
            toast.error('Username Not Found !!!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else if (status == 422) {
            toast.error('Please Enter OTP !!!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else {
            navigate("/logUser", { replace: true })
        }
    }
    return (
        <>
            <Headers color="black" />

            <div className="main-verify">
                <h2>Enter OTP Sent to your Email ID</h2>
                <div className="verify-form">
                    <form onSubmit={handleSubmit} className="otp-form">
                        <input
                            name="otp"
                            type="number"
                            autoComplete="off"
                            placaholder="Enter OTP"
                            onChange={handleChange}
                        />

                        <button type="submit">Submit</button>
                    </form>
                </div>
            </div>

            <ToastContainer />
            <Footer />
        </>
    )
}

export default VerifyPin