import React from "react";
import { NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";
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
            Register Form
          </h4>
          <div className="card-body">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="row g-1">
                <div className="col-sm">
                  <div className="form-floating mb-1 p-0">
                    {/* is-valid */}
                    <input
                      type="text"
                      className="form-control form-sm-control border-info"
                      id="floatingInputInvalid"
                      placeholder=" "
                      name="user_name"
                      {...register("user_name", { required: true })}
                    />
                    {errors.user_name && (
                      <span className="text-danger float-start small">
                        This field is required
                      </span>
                    )}
                    <label htmlFor="floatingInputInvalid">
                      Enter Full Name
                    </label>
                  </div>
                </div>
                <div className="col-sm">
                  <div className="form-floating mb-1 p-0">
                    <input
                      type="email"
                      className="form-control form-sm-control border-info"
                      id="floatingInputInvalid"
                      placeholder=" "
                      name="user_email"
                      {...register("user_email", { required: true })}
                    />
                    {errors.user_email && (
                      <span className="text-danger float-start small">
                        This field is required
                      </span>
                    )}
                    <label htmlFor="floatingInputInvalid">Enter Email Id</label>
                  </div>
                </div>
              </div>
              <div className="row g-1">
                <div className="col-sm">
                  <div className="form-floating mb-1 p-0">
                    <input
                      type="text"
                      className="form-control form-sm-control border-info"
                      id="floatingInputInvalid"
                      placeholder=" "
                      name="user_name"
                      {...register("user_name", { required: true })}
                    />
                    {errors.user_name && (
                      <span className="text-danger float-start small">
                        This field is required
                      </span>
                    )}
                    <label htmlFor="floatingInputInvalid">
                      Enter an user name
                    </label>
                  </div>
                </div>
                <div className="col-sm">
                  <div className="form-floating mb-1 p-0">
                    <input
                      type="tel"
                      className="form-control form-sm-control border-info"
                      id="floatingInputInvalid"
                      placeholder=" "
                      name="user_name"
                      {...register("user_contact", {
                        required: true,
                        pattern:
                          /((\+*)((0[ -]*)*|((91 )*))((\d{12})+|(\d{10})+))|\d{5}([- ]*)\d{6}/,
                      })}
                    />
                    {errors.user_contact && (
                      <span className="text-danger float-start small">
                        This field is required
                      </span>
                    )}
                    <label htmlFor="floatingInputInvalid">
                      Enter Contact number
                    </label>
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
        </div>
      </div>
    </div>
  );
}

export default Register;
