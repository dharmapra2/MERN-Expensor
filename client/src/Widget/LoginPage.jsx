import React from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

function LoginPage() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    reValidateMode: "onChange",
  });
  const onSubmit = async (data) => {
    const fetchResult = await axios
      .patch(`${process.env.REACT_APP_BASE_URL}/auth/login`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((result) => result)
      .catch((error) => error?.response);
    if (fetchResult?.status === 200) {
      localStorage.setItem("token", fetchResult?.data?.token ?? "");
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "You Login successfully.",
      });
      reset();
      navigate("/");
    } else if (fetchResult?.status === 400) {
      Swal.fire({
        icon: "warning",
        title: "Warning",
        text: "Invalid Password!.",
      });
      localStorage.removeItem("token");
    } else if (fetchResult?.status === 401) {
      Swal.fire({
        icon: "error",
        title: "Oops..",
        text: "User does not exist",
      });
      localStorage.removeItem("token");
    }
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
                  type="email"
                  className="form-control form-sm-control border-info"
                  id="user_email"
                  placeholder=" "
                  name="user name"
                  {...register("user_email", { required: true })}
                />
                {errors.user_email && (
                  <span className="text-danger float-start small">
                    Email is required
                  </span>
                )}
                <label htmlFor="user_email">Enter your email address</label>
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
