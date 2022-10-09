import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";

function LoginPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    reValidateMode: "onChange",
  });
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <div className="container-fluid mt-1 p-1">
      <div className="card text-center">
        <div className="card-header bg-dark">
          <ul className="nav nav-tabs card-header-tabs nav-justified">
            <li className="nav-item">
              <NavLink className="nav-link" aria-current="true" to="/login">
                Login
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" aria-current="true" to="/register">
                Register
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="card-body container">
          <h4 className="card-title border-bottom border-info border-2">
            Login Form
          </h4>
          <div className="card-body">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="row g-1">
                <div className="col-sm">
                  <div className="form-floating mb-1 p-0">
                    <input
                      type="text"
                      className="form-control form-sm-control border-info"
                      id="username"
                      {...register("user_name", { required: true })}
                    />
                    {errors.user_name && (
                      <span className="text-danger float-start small">
                        This field is required
                      </span>
                    )}
                    <label htmlFor="username">Enter your user name</label>
                  </div>
                </div>
              </div>
              <div className="row g-1">
                <div className="col-sm">
                  <div className="form-floating mb-1 p-0">
                    <input
                      type="password"
                      className="form-control form-sm-control border-info"
                      id="userpwd"
                      {...register("user_pwd", { required: true })}
                    />
                    {errors.user_pwd && (
                      <span className="text-danger float-start small">
                        This field is required
                      </span>
                    )}
                    <label htmlFor="userpwd">Enter Password</label>
                  </div>
                </div>
              </div>
              <div className="row g-1">
                <button type="submit" className="btn btn-info">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
