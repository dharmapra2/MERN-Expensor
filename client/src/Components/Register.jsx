import React from "react";
import { NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
function Register() {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    reValidateMode: "onChange",
  });
  const onSubmit = async (data) => {
    /*  for insert new record */
    await axios
      .post(`${process.env.REACT_APP_BASE_URL}/auth/register`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response);
        if (response?.status === 201) {
          // console.log("data Saved");
        }
      });
    // reset();
  };
  return (
    <div className="container my-5">
      <h4 className="border-bottom border-info border-2 text-center">
        Sign up
      </h4>
      <div className="container-fluid">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row g-1">
            <div className="col-sm">
              <div className="form-floating mb-1 p-0">
                <input
                  type="text"
                  className="form-control form-sm-control border-info"
                  id="user_name"
                  placeholder=" "
                  name="user_name"
                  {...register("user_name", { required: true })}
                />
                {errors.user_name && (
                  <span className="text-danger float-start small">
                    This field is required
                  </span>
                )}
                <label htmlFor="user_name">Enter Full Name</label>
              </div>
            </div>
            <div className="col-sm">
              <div className="form-floating mb-1 p-0">
                <input
                  type="email"
                  className="form-control form-sm-control border-info"
                  id="user_email"
                  placeholder=" "
                  name="user_email"
                  {...register("user_email", { required: true })}
                />
                {errors.user_email && (
                  <span className="text-danger float-start small">
                    This field is required
                  </span>
                )}
                <label htmlFor="user_email">Enter Email Id</label>
              </div>
            </div>
          </div>
          <div className="row g-1">
            <div className="col-sm">
              <div className="form-floating mb-1 p-0">
                <input
                  type="password"
                  className="form-control form-sm-control border-info"
                  id="user_pwd"
                  placeholder=" "
                  name="user_pwd"
                  {...register("user_pwd", {
                    required: true,
                    min: {
                      value: 8,
                      message:
                        "password should minimum of 8 or more character ",
                    },
                    max: {
                      value: 16,
                      message: "password should maximum of 16 character ",
                    },
                  })}
                />
                {errors.user_pwd && (
                  <span className="text-danger float-start small">
                    This field is required
                  </span>
                )}
                <label htmlFor="user_pwd">Enter Password</label>
              </div>
            </div>
          </div>
          <div className="row g-1">
            <button type="submit" className="btn btn-info">
              Create An Account
            </button>
          </div>
        </form>
      </div>
      <p className="float-end">
        <NavLink className="text-primary" aria-current="true" to="/login">
          Already registered | Back to login
        </NavLink>
      </p>
    </div>
  );
}

export default Register;
