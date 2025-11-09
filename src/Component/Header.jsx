import React, { useContext, useState, useEffect } from "react";
import Container from "./Container";
import logo from "../assets/logo.png";
import { Link } from "react-router";
import { AuthContext } from "../Contexts/AuthContext";
import { FaPortrait, FaUser } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { IoIosSettings, IoMdLogIn, IoMdLogOut } from "react-icons/io";

const Header = () => {
  const [open, setOpen] = useState(false);
  const { user, logOut } = useContext(AuthContext);
  // 1️⃣ Load initial theme (from localStorage or default = "light")
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  // 2️⃣ Apply theme to <html> tag and save to localStorage
  useEffect(() => {
    const html = document.querySelector("html");
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // 3️⃣ Handle toggle change
  const handleTheme = (checked) => {
    setTheme(checked ? "dark" : "light");
  };

  return (
    <header>
      <Container className="py-3 px-0">
        <div className="navbar">
          {/* Dropdown Menu & Logo */}
          <div className="navbar-start">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {" "}
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />{" "}
                </svg>
              </div>
              <ul
                tabIndex="-1"
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                <li>
                  <a>Item 1</a>
                </li>
                <li>
                  <a>Parent</a>
                  <ul className="p-2">
                    <li>
                      <a>Submenu 1</a>
                    </li>
                    <li>
                      <a>Submenu 2</a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a>Item 3</a>
                </li>
              </ul>
            </div>

            {/* Logo */}
            <Link to={"/"}>
              <img src={logo} alt="It is fenease logo" className="size-20 transition-transform common-hover-effect hover:scale-[103%]" />
            </Link>
          </div>

          {/* Navigation Menu */}
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
              <li>
                <a>Item 1</a>
              </li>
              <li>
                <details>
                  <summary>Parent</summary>
                  <ul className="p-2">
                    <li>
                      <a>Submenu 1</a>
                    </li>
                    <li>
                      <a>Submenu 2</a>
                    </li>
                  </ul>
                </details>
              </li>
              <li>
                <a>Item 3</a>
              </li>
            </ul>
          </div>

          {/* User Profile and Theme Toggler */}
          <div className="navbar-end gap-3">
            <div className="relative">
              {/* Profile Icon */}
              <button
                onClick={() => setOpen(!open)}
                className="flex items-center justify-center w-10 h-10 rounded-full border border-secondary overflow-hidden"
              >
                {user?.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt="User Avatar"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <FaUser className="text-2xl"></FaUser>
                )}
              </button>

              {/* Dropdown Menu */}
              {open && (
                <div className="absolute right-0 mt-3 w-48 bg-base-100 rounded-2xl shadow-lg p-3 border border-base-200 animate-fadeIn z-50">
                  <ul className="flex flex-col gap-2">
                    {user && (
                      <li className="px-3 py-2 text-sm font-medium text-primary/80">
                        Hi, {user.displayName || "User"}
                      </li>
                    )}

                    <li>
                      <Link
                        to="/profile"
                        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-base-200"
                      >
                        <CgProfile className="text-xl" />
                        My Profile
                      </Link>
                    </li>

                    <li>
                      <Link
                        to="/settings"
                        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-base-200"
                      >
                        <IoIosSettings className="text-xl" />
                        Settings
                      </Link>
                    </li>

                    <hr className="my-2 border-base-300" />

                    {user ? (
                      <button
                        onClick={logOut}
                        className="flex items-center gap-2 w-full text-left px-3 py-2 rounded-lg text-error hover:bg-base-200"
                      >
                        <IoMdLogOut className="text-xl" />
                        Logout
                      </button>
                    ) : (
                      <Link
                        to="/login"
                        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-base-200 text-success"
                      >
                        <IoMdLogIn className="text-xl" />
                        Login
                      </Link>
                    )}
                  </ul>
                </div>
              )}
            </div>

            {/* Theme Toggler */}
            <div>
              <label className="swap swap-rotate">
                {/* checkbox controls the theme */}
                <input
                  type="checkbox"
                  onChange={(e) => handleTheme(e.target.checked)}
                  defaultChecked={localStorage.getItem("theme") === "dark"}
                />

                {/* sun icon (light mode) */}
                <svg
                  className="swap-off h-7 w-7 fill-current text-yellow-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M5.64,17l-.71.71a1,1,0,0,0,1.41,1.41l.71-.71A1,1,0,0,0,5.64,17ZM12,5a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM12,19a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM19,11h1a1,1,0,0,0,0,2H19a1,1,0,0,0,0-2ZM4,11H3a1,1,0,0,0,0,2H4a1,1,0,0,0,0-2Zm12.36,6A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM7.05,5.64A1,1,0,0,0,5.64,7.05l.71.71A1,1,0,1,0,7.76,6.34ZM16.95,7.05l.71-.71A1,1,0,1,0,16.25,5.64L15.54,6.35A1,1,0,1,0,16.95,7.05Z" />
                </svg>

                {/* moon icon (dark mode) */}
                <svg
                  className="swap-on h-7 w-7 fill-current text-slate-200"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Z" />
                </svg>
              </label>
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
