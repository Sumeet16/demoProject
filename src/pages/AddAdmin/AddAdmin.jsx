import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./AddAdmin.css";

const AddAdmin = () => {
  const [newAdminSchema, setNewAdminSchema] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleChange = (event) => {
    setNewAdminSchema({ ...newAdminSchema, [event.target.name]: event.target.value })
  }
  const handleSubmit = async (event) => {
    event.preventDefault();

    const { username, email, password } = newAdminSchema;

    const res = await fetch("http://localhost:8080/addAdmin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username, email, password
      })
    })

    const result = await res.json();
    const statusCode = res.status;

    if (statusCode === 422 || !result) {
      toast.error('Invalid Regestration !!!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      navigate("/logadmin", {replace:true});
    }
  };
  return (
    <>

      <form method="post" onSubmit={(event) => handleSubmit(event)} className="input-holder">
        <h2>Add a New Admin</h2>
        <input
          type="text"
          name="username"
          id="name"
          placeholder="Admin Username"
          onChange={(event) => handleChange(event)}
        />
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Admin Email"
          onChange={(event) => handleChange(event)}

        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Admin Password"
          onChange={(event) => handleChange(event)}

        />

        <div className="alreadyuser">
          <a href="/logadmin" className="userLink">Already a User</a>
        </div>
        <button type="submit" className="submit-btn">Add Admin</button>
        <ToastContainer />

      </form>
    </>
  );
};

export default AddAdmin;

// Add Admin- admin username, email and pass
