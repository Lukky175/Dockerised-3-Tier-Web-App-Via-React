import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      alert(data.message);
    } catch (err) {
      console.error(err);
      alert("Error saving data");
    }
  };


  return (
    <section className="login-section">
      {/* Login Form */}
      <div className="login-form-box">
        <div className="login-form-value">
          <form onSubmit={handleSubmit}>
            <h2>Login</h2>

            <div className="inputbox">
              <ion-icon name="mail-outline"></ion-icon>
              <input
                type="email"
                id="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="email">Email</label>
            </div>

            <div className="inputbox">
              <ion-icon name="lock-closed-outline"></ion-icon>
              <input
                type="password"
                id="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label htmlFor="password">Password</label>
            </div>

            <div className="forget">
              <label>
                <input type="checkbox" /> Remember Me
              </label>
              <a href="#">Forget Password?</a>
            </div>

            <button type="submit" id="loginButton">Login</button>

            <div className="register">
              <p>
                Don't Have An Account? <Link to="/register">Register</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Login;
