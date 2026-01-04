import React, { useContext, useState, useEffect } from "react";
import Container from "./Container";
import logo from "../assets/logo.png";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../Contexts/AuthContext";
import { FaPortrait, FaUser } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { IoIosSettings, IoMdLogIn, IoMdLogOut } from "react-icons/io";
import { GrUpdate } from "react-icons/gr";
import { FiMoon, FiSun } from "react-icons/fi";

const Header = () => {
  const [open, setOpen] = useState(false);
  const { user, logOut } = useContext(AuthContext);
  const [isSticky, setIsSticky] = useState(false);

  //* Load initial theme (from localStorage or default = "light")
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  //* Apply theme to <html> tag and save to localStorage
  useEffect(() => {
    const html = document.querySelector("html");
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  //* Handle toggle change
  const handleTheme = (checked) => {
    setTheme(checked ? "dark" : "light");
  };

  //* Navigation Public Links
  const publicLinks = [
    { id: 1, path: "/", name: "Home" },
    { id: 2, path: "/about", name: "About" },
    { id: 2, path: "/contact", name: "Contact" },
    { id: 2, path: "/privacy", name: "Privacy" },
  ];

  //* Navigation Private Links
  const privateLinks = [
    { id: 2, path: "/add-transaction", name: "Add Transaction" },
    { id: 3, path: "/my-transactions", name: "My Transactions" },
    { id: 4, path: "/reports", name: "Reports" },
    { id: 5, path: "/profile", name: "Profile" },
  ];

  //* Header Sticky
  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  //* Profile Dropdown Side Clicking Close
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".profile-menu")) {
        setOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${isSticky ? "bg-transparent backdrop-blur-[80px]" : "bg-base-100"
      }`}>
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
                className="menu menu-sm dropdown-content gap-3 mt-3 p-4 bg-base-100 rounded-box z-1 w-52 shadow"
              >
                {
                  publicLinks.map(({ id, path, name }) => (
                    <li key={id}>
                      <NavLink to={path}>{name}</NavLink>
                    </li>
                  ))}

                {user &&
                  privateLinks.map(({ id, path, name }) => (
                    <li key={id}>
                      <NavLink to={path}>{name}</NavLink>
                    </li>
                  ))
                }
              </ul>
            </div>

            {/* Logo */}
            <Link to={"/"}>
              <img src={logo} alt="It is fenease logo" className="size-14 transition-transform common-hover-effect hover:scale-[103%] lg:size-20" />
            </Link>
          </div>

          {/* Navigation Menu */}
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal gap-3">
              {
                publicLinks.map(({ id, path, name }) => (
                  <li key={id}>
                    <NavLink to={path}>{name}</NavLink>
                  </li>
                ))}

              {user &&
                privateLinks.map(({ id, path, name }) => (
                  <li key={id}>
                    <NavLink to={path}>{name}</NavLink>
                  </li>
                ))
              }
            </ul>
          </div>


          <div className="navbar-end gap-3">
            {/* Theme Toggler */}
            <div>
              <label className="swap swap-rotate">
                {/* checkbox controls the theme */}
                <input
                  type="checkbox"
                  onChange={(e) => handleTheme(e.target.checked)}
                  defaultChecked={localStorage.getItem("theme") === "dark"}
                />

                {/* light mode icon */}
                <FiSun className="swap-off h-7 w-7 text-primary" />

                {/* dark mode icon */}
                <FiMoon className="swap-on h-7 w-7 text-primary" />
              </label>
            </div>

            {/* Login & Logout Buttons */}
            <div>
              {user ? (
                <Link
                  onClick={logOut}
                  data-tip="LogOut"
                  className="tooltip tooltip-bottom flex items-center gap-2 text-error cursor-pointer transition-transform duration-300 ease-linear hover:scale-105"
                >
                  <IoMdLogOut className="text-3xl" />
                </Link>
              ) : (
                <Link
                  to="/login"
                  className="tooltip tooltip-bottom flex items-center gap-2 text-success cursor-pointer transition-transform duration-300 ease-linear hover:scale-105"
                  data-tip="LogIn"
                >
                  <IoMdLogIn className="text-3xl" />
                </Link>
              )}
            </div>

            {/* User Profile and Theme Toggler */}
            {user && (
              <div className="tooltip tooltip-bottom relative profile-menu" data-tip="Profile">
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
                          Hi, <span className="font-semibold text-base text-accent">{user.displayName || "User"}</span>
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
                          to="/update-profile"
                          className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-base-200"
                        >
                          <GrUpdate className="text-lg" />
                          Update Profile
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
            )}
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
