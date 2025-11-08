import React from "react";
import Container from "./Container";
import logo from "../assets/logo.png";
import { Link } from "react-router";

const Header = () => {
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
              <img
                src={logo}
                alt="It is fenease logo"
                className="size-20 transition-transform common-hover-effect hover:scale-[103%]"
              />
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
            <button
              // onClick={() => setOpen(!open)}
              className="flex items-center justify-center w-12 h-12 rounded-full border border-secondary overflow-hidden"
            >
              {/* {user?.photoURL ? ( */}
              <img
                // src={user.photoURL}
                src={logo}
                alt="User Avatar"
                className="w-full h-full object-cover"
              />
              {/* ) : ( */}
              {/* <FaUserCircle className="text-3xl text-primary" /> */}
              {/* )} */}
            </button>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
