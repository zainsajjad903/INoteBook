import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [credentials, setcredentials] = useState({ email: "", password: "" });
  let navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });

    const json = await response.json();
    console.log(json);

    if (json.success) {
      localStorage.setItem("token", json.authToken);
      navigate("/");
      toast.success("Login successfuly");
    } else {
      toast.error("Invalid credentials");
    }
  };

  const onChange = (e) => {
    setcredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <div
        className="text-center py-4 mb-4 shadow-sm"
        style={{
          background: "linear-gradient(135deg, #212845, #D6628D)",
          color: "white",
          borderRadius: "10px",
        }}
      >
        <h1 className="fw-bold mb-2">
          <i className="fa fa-book-open me-2"></i> Welcome to{" "}
          <span className="text-warning">INoteBook</span>
        </h1>
        <p className="mb-0 fs-5 text-light">
          Your personal secure space to create, edit, and manage notes easily 🚀
        </p>
      </div>
      <div className="d-flex justify-content-center align-items-center vh-50 bg-light ">
        <div
          className="card shadow-lg p-4"
          style={{ width: "400px", borderRadius: "15px" }}
        >
          <h2 className="text-center mb-4 text-primary fw-bold">
            <i className="fa fa-lock me-2"></i> Login
          </h2>
          <form onSubmit={handleSubmit}>
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
                aria-describedby="emailHelp"
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

            <button
              type="submit"
              className="btn btn-primary w-100 btn-lg shadow-sm"
            >
              <i className="fa fa-sign-in-alt me-2"></i> Login
            </button>

            <p className="text-center mt-3 mb-0">
              <small>
                Don’t have an account?{" "}
                <a
                  href="/signup"
                  className="text-decoration-none fw-bold text-primary"
                >
                  Sign up
                </a>
              </small>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
