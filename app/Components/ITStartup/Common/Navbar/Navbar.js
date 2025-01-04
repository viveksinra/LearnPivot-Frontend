"use client";
import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import MenuItem from "./MenuItem";
import { menus } from "./menus";
import { Avatar, Button } from "@mui/material";
import { authService } from "@/app/services";
import MainContext from "@/app/Components/Context/MainContext";
import { FaUserCircle } from "react-icons/fa";
import Cookies from "js-cookie";

const Navbar = () => {
  const [collapsed, setCollapsed] = useState(true);
  const toggleNavbar = () => {
    setCollapsed(!collapsed);
  };
  const currentUser = Cookies.get("currentUser");

  const { state } = useContext(MainContext);

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
          <nav className="navbar navbar-expand-md navbar-light" style={{ alignItems: "center"}}>
            <Link href="/" className="navbar-brand">
              <Image
                src="/images/logo.png"
                alt="logo"
                width={124}
                height={38}
                loading="lazy"
              />
            </Link>

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

            <div 
              className={`${navbarClass} max-md:bg-white md:bg-transparent absolute md:static w-full left-0 top-full`} 
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav">
                {menus.map((menuItem) => (
                  <MenuItem key={menuItem.label} {...menuItem} />
                ))}
              </ul>
            </div>

            <div className="others-options" style={{ marginTop: "-15px"}}>
              {state?.isAuthenticated && currentUser ? (
                <Link href="/userDash">
                  <Button
                    color="secondary"
                    startIcon={
                      <Avatar
                        alt={state.name}
                        src={
                          authService.getLoggedInUser()?.userImage ??
                          "https://res.cloudinary.com/oasismanors/image/upload/v1687519053/user_myqgmv.png"
                        }
                      />
                    }
                  >
                    
                  </Button>
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
      <div className="navbar-space"></div>
    </div>
  );
};

export default Navbar;