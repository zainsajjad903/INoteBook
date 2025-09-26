import React from "react";
import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
const Navbar = () => {
  let navigate = useNavigate();
  let location = useLocation();
  useEffect(() => {
    console.log(location.pathname);
  }, [location]);
  const handlelogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <>
      <div>
        <nav
          className="navbar navbar-expand-lg shadow-sm"
          style={{ backgroundColor: "#212845" }}
        >
          <div className="container-fluid">
            {/* Brand */}
            <Link className="navbar-brand fw-bold text-white" to="/">
              <i className="fa fa-book me-2 text-warning"></i> INoteBook
            </Link>

            {/* Toggler (Mobile Menu Button) */}
            <button
              className="navbar-toggler text-white border-0"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            {/* Collapsible Menu */}
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              {/* Left Links */}
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      location.pathname === "/" ? "active fw-semibold" : ""
                    } text-white`}
                    aria-current="page"
                    to="/"
                  >
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      location.pathname === "/about" ? "active fw-semibold" : ""
                    } text-white mx-2`}
                    to="/about"
                  >
                    About
                  </Link>
                </li>
              </ul>

              {/* Right Side (Auth Buttons) */}
              {!localStorage.getItem("token") ? (
                <div className="d-flex">
                  <Link
                    to="/login"
                    className="btn btn-outline-light mx-1 px-3 fw-semibold"
                  >
                    <i className="fa fa-sign-in-alt me-1"></i> Login
                  </Link>
                  <Link
                    to="/signup"
                    className="btn btn-light text-dark mx-1 px-3 fw-semibold"
                  >
                    <i className="fa fa-user-plus me-1"></i> Signup
                  </Link>
                </div>
              ) : (
                <button
                  onClick={handlelogout}
                  className="btn btn-danger fw-semibold px-3"
                >
                  <i className="fa fa-sign-out-alt me-1"></i> Logout
                </button>
              )}
            </div>
          </div>
        </nav>
      </div>
      ;
    </>
  );
};
export default Navbar;
