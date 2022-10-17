import React from "react";
import { NavLink, redirect } from "react-router-dom";
function AppBar() {
  const token = localStorage.getItem("token");
  const clearLocalStogare = () => {
    localStorage.clear();
    redirect("/login");
  };
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-primary">
      <div className="container-fluid">
        <NavLink className="navbar-brand text-dark" to="/">
          Expensor App
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb--0">
            <div className="nav-link">Category</div>
            {token ? (
              <button
                className="btn btn-sm btn-danger"
                onClick={() => clearLocalStogare()}
              >
                Logout
              </button>
            ) : (
              <NavLink className="nav-link" to="/login">
                Login
              </NavLink>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default AppBar;
