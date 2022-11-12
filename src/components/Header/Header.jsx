import React, { useEffect, useState } from "react";
import "./Header.css";
import { UilBars } from "@iconscout/react-unicons";
import { UilTimes } from "@iconscout/react-unicons";
import { useNavigate } from "react-router-dom";

const Header = (props) => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [accessBtn, setAccessBtn] = useState();
  const navBtnClick = (navRoute) => {
    setShowMenu(false);
    navigate(navRoute, { replace: true });
  };
  useEffect(() => {
    const access = localStorage.getItem("token");

    if (access) {
      setAccessBtn(false);
    } else {
      setAccessBtn(true);
    }
  }, []);

  const signOutUser = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userData");
    localStorage.removeItem("userName");
    navigate("/", { replace: true })

    location.reload();
  }
  return (
    <>
      <header>
        <div className="nav">
          <div className="logo" style={{ color: props.color }}>
            TRADELAL<span className="dot">.</span>
          </div>

          <div className="mobile-nav-bar-logo">
            <UilBars
              className="hamburgerMenu"
              onClick={() => {
                setShowMenu(true);
              }}
            />
          </div>
        </div>

        {showMenu ? (
          <div className="header_navBar_box_mobile">
            <div className="navBar_box">
              <div className="box_header">
                <div></div>
                <UilTimes
                  className="close"
                  onClick={() => {
                    setShowMenu(false);
                  }}
                />
              </div>

              <div className="item_list">
                <p
                  className="nav_item"
                  onClick={() => {
                    navBtnClick("/");
                  }}
                >
                  Home
                </p>
                <p
                  className="nav_item"
                  onClick={() => {
                    navBtnClick("/about");
                  }}
                >
                  About
                </p>
                <p
                  className="nav_item"
                  onClick={() => {
                    navBtnClick("/courses");
                  }}
                >
                  Courses
                </p>
                <p
                  className="nav_item"
                  onClick={() => {
                    navBtnClick("/blogs");
                  }}
                >
                  Blogs
                </p>
                <p
                  className="nav_item"
                  onClick={() => {
                    navBtnClick("/contact");
                  }}
                >
                  Contact Us
                </p>

                {accessBtn ?
                  <div>
                    <p className="nav_item"
                      onClick={() => {
                        navBtnClick("/loguser")
                      }}>
                      Login
                    </p>
                    <p className="nav_item"
                      onClick={() => {
                        navBtnClick("/adduser")
                      }}>
                      Sign Up
                    </p>
                  </div>
                  : <div>
                    <p
                      className="nav_item"
                      onClick={() => {
                        navBtnClick("/mylearning");
                      }}
                    >
                      My Learning
                    </p>
                    <p
                      className="nav_item"
                      onClick={() => {
                        navBtnClick("/community");
                      }}
                    >
                      Community Tab
                    </p>
                    <p
                      className="nav_item"
                      onClick={() => {
                        navBtnClick("/events");
                      }}
                    >
                      Events
                    </p>
                    <p className="nav_item"
                      onClick={signOutUser}>
                      Logout
                    </p>
                  </div>
                }
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
      </header>
    </>
  );
};

export default Header;
