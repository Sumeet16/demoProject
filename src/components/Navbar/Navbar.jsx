import React, { useEffect, useState } from 'react'
import user from "../../assets/user.png";
import { Link, useNavigate } from "react-router-dom";
import './Navbar.css'

const Navbar = () => {
  const [userClicked, setUserClicked] = useState(false);
  const [accessBtn, setAccessBtn] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const adminToken = localStorage.getItem("adminToken");
    if (adminToken) {
      setAccessBtn(false);
    }
  })
  const handleUserClick = () => {
    setUserClicked(!userClicked);
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    setAccessBtn((previous)=>{
      return !previous
    });
  };

  const handleLogin = () => { 
    navigate("/logadmin", {replace: true})
  }
  const handleRegister = () => { 
    navigate("/addadmin", {replace: true})
  }

  return (
    <>
      <nav>
        <h1 onClick={() => {navigate("/", {replace:true})}}>Dashboard</h1>
        <div className="nav-links">
          <Link to="addProduct" className="link">
            Add Product
          </Link>
          <Link to="scheduler" className="link">
            Meeting Scheduler
          </Link>
          <Link to="chatroom" className="link">
            Chat Room
          </Link>
          <Link to="addBlog" className="link">
            Add Blog
          </Link>
          <Link to="userdetail" className="link">
            User Details
          </Link>
        </div>
        <div className="user-options">

          {accessBtn ? <div>
            <button className="logout-btn" onClick={handleLogin}>
              Login
            </button>
            <button className="logout-btn" onClick={handleRegister}>
              Register
            </button>
          </div>
            : 
            <div>
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </div>}
          <div className="profile">
            <img
              src={user}
              alt=""
              className="user-img"
              onClick={handleUserClick}
            />
            <div
              className={userClicked ? "user-menu" : "user-menu-close"}
            ></div>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar