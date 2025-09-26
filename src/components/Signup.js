import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [credentials, setcredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password, cpassword } = credentials;

    if (password !== cpassword) {
      toast.error("Passwords do not match");
      return;
    }

    const response = await fetch("http://localhost:5000/api/auth/", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    const json = await response.json();
    console.log(json);

    if (json.success) {
      localStorage.setItem("token", json.authToken);
      toast.success("Signup successful!");
      navigate("/");
    } else {
      toast.error("User already exists or invalid details");
    }
  };

  const onChange = (e) => {
    setcredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="d-flex justify-content-center align-items-center  bg-light">
      <div
        className="card shadow-lg p-4"
        style={{ width: "450px", borderRadius: "15px" }}
      >
        <h2 className="text-center mb-4 text-primary fw-bold">
          <i className="fa fa-user-plus me-2"></i> Sign Up
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label fw-semibold">
              Full Name
            </label>
            <input
              type="text"
              className="form-control form-control-lg"
              id="name"
              name="name"
              value={credentials.name}
              onChange={onChange}
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label fw-semibold">
              Email Address
            </label>
            <input
              type="email"
              className="form-control form-control-lg"
              id="email"
              name="email"
              value={credentials.email}
              onChange={onChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label fw-semibold">
              Password
            </label>
            <input
              type="password"
              className="form-control form-control-lg"
              id="password"
              name="password"
              value={credentials.password}
              onChange={onChange}
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="cpassword" className="form-label fw-semibold">
              Confirm Password
            </label>
            <input
              type="password"
              className="form-control form-control-lg"
              id="cpassword"
              name="cpassword"
              value={credentials.cpassword}
              onChange={onChange}
              placeholder="Re-enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100 btn-lg shadow-sm"
          >
            <i className="fa fa-user-check me-2"></i> Create Account
          </button>

          <p className="text-center mt-3 mb-0">
            <small>
              Already have an account?{" "}
              <a
                href="/login"
                className="text-decoration-none fw-bold text-primary"
              >
                Login
              </a>
            </small>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
