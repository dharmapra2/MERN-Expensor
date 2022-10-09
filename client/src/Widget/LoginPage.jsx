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
    <div className="container my-5">
      <h4 className="border-bottom border-info border-2 text-center">
        Sign in
      </h4>
      <div className="container-fluid">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row g-1">
            <div className="col-sm">
              <div className="form-floating mb-1 p-0">
                <input
                  type="text"
                  className="form-control form-sm-control border-info"
                  id="username"
                  placeholder=" "
                  name="user name"
                  {...register("user_name", { required: true })}
                />
                {errors.user_name && (
                  <span className="text-danger float-start small">
                    Username required
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
                  placeholder=" "
                  name="password"
                  {...register("user_pwd", { required: true })}
                />
                {errors.user_pwd && (
                  <span className="text-danger float-start small">
                    Password required
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
      <p className="float-end">
        <NavLink className="text-primary" aria-current="true" to="/register">
          Don't have an account ? Please Register
        </NavLink>
      </p>
    </div>
  );
}

export default LoginPage;
