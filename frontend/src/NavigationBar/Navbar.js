import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navdiv">
        <div className="logo">
          <a href="#">AdaptEd</a>
        </div>
        <ul>
          <li>
            <ion-icon name="home-outline"></ion-icon>
            <a href="">Home</a>
          </li>
          <li>
            <ion-icon name="home-outline"></ion-icon>
            <a href="">Donate Us</a>
          </li>
          <li>
            <ion-icon name="people-outline"></ion-icon>
            <a href="">About Us</a>
          </li>
          <li>
            <ion-icon name="call-outline"></ion-icon>
            <a href="">Contact</a>
          </li>
          <li>
            <button>
             <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
              Login
             </Link>
            </button>
          </li>
          <li>
            <button>
              <Link to="/register" style={{ textDecoration: "none", color: "inherit" }}>Register</Link>
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
