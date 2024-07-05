"use client"
import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import MenuItem from "./MenuItem";
import { menus } from "./menus";
import { Avatar, Button } from "@mui/material";
import { authService } from "@/app/services";
import MainContext from "@/app/Components/Context/MainContext";
import { FaUserCircle } from 'react-icons/fa';

const Navbar = () => {
  // State
  const [collapsed, setCollapsed] = useState(true);
  const toggleNavbar = () => {
    setCollapsed(!collapsed);
  };

  // Context
  const { state } = useContext(MainContext);

  // Effects
  useEffect(() => {
    const handleScroll = () => {
      const elementId = document.getElementById("navbar");
      if (window.scrollY > 170) {
        elementId?.classList.add("is-sticky");
      } else {
        elementId?.classList.remove("is-sticky");
      }
    };
    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // CSS Classes
  const navbarClass = collapsed
    ? "collapse navbar-collapse"
    : "collapse navbar-collapse show";
  const togglerClass = collapsed
    ? "navbar-toggler navbar-toggler-right collapsed"
    : "navbar-toggler navbar-toggler-right";

  return (
    <div id="navbar" className="navbar-area">
      <div className="main-nav">
        <div className="container">
          <nav className="navbar navbar-expand-md navbar-light">
            {/* Logo */}
            <Link href="/" className="navbar-brand">
              <Image
                src="/images/logo.png"
                alt="logo"
                width={124}
                height={38}
              />
            </Link>

            {/* Toggle Button */}
            <button
              onClick={toggleNavbar}
              className={togglerClass}
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="icon-bar top-bar"></span>
              <span className="icon-bar middle-bar"></span>
              <span className="icon-bar bottom-bar"></span>
            </button>

            {/* Menu Items */}
            <div className={navbarClass} id="navbarSupportedContent">
              <ul className="navbar-nav">
                {menus.map((menuItem) => (
                  <MenuItem key={menuItem.label} {...menuItem} />
                ))}
              </ul>
            </div>

            {/* Other Options */}
            <div className="others-options">
              {state?.isAuthenticated ? (
                <Link href="/dashboard">
                  <Button color="secondary" startIcon={<Avatar alt={state.name} src={authService.getLoggedInUser()?.userImage ?? "https://res.cloudinary.com/oasismanors/image/upload/v1687519053/user_myqgmv.png"} />}>Dashboard</Button>
                </Link>
              ) : (
                <Link href="/login">
                  <Button startIcon={<FaUserCircle />}>Login</Button>
                </Link>
              )}
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
