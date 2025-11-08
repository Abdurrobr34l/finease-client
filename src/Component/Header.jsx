import React, { useContext, useState } from "react";
import Container from "./Container";
import logo from "../assets/logo.png";
import { Link } from "react-router";
import { AuthContext } from "../Contexts/AuthContext";
import { FaUserCircle } from "react-icons/fa";

const Header = () => {
    const [open, setOpen] = useState(false);
  const { user, logOut } = useContext(AuthContext);

  return (
    <header>
      <Container className="py-6 px-0">
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
            <img src={logo} alt="It is fenease logo" className="size-20 transition-transform common-hover-effect hover:scale-[103%]"/>
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
          <div className="navbar-end">
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
          <FaUserCircle className="text-3xl text-primary" />
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
                className="block px-3 py-2 rounded-lg hover:bg-base-200"
              >
                My Profile
              </Link>
            </li>

            <li>
              <Link
                to="/settings"
                className="block px-3 py-2 rounded-lg hover:bg-base-200"
              >
                Settings
              </Link>
            </li>

            <hr className="my-2 border-base-300" />

            {user ? (
              <button
                onClick={logOut}
                className="block w-full text-left px-3 py-2 rounded-lg text-error hover:bg-base-200"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="block px-3 py-2 rounded-lg hover:bg-base-200 text-success"
              >
                Login
              </Link>
            )}
          </ul>
        </div>
      )}
    </div>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
