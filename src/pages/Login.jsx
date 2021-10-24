import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { login } from "../action";

const defaultData = {
  email: "",
  password: "",
};

function Login() {
  const history = useHistory();
  const dispatch = useDispatch();
  let { isLoading, logError } = useSelector((state) => state.user);

  const [openPass, setOpenPass] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [data, setData] = useState(defaultData);

  useEffect(() => {
    if (!!logError.length) setErrorMessage(logError);
    else setErrorMessage("");
  }, [logError]);

  const isOpen = () => (openPass ? "fas fa-eye" : "fas fa-eye-slash");

  const onChangeData = (e) => {
    const key = e.target.attributes.id.value;
    const value = e.target.value;
    // console.log(key, value);
    setData((prevData) => ({ ...prevData, [key]: value }));
  };

  const submitForm = (e) => {
    e.preventDefault();

    dispatch(login(data, history));
  };

  return (
    <div className="authentication-bg">
      <div className="account-pages my-5">
        <div className="container">
          <Helmet>
            <title>Login | Purwadhicare</title>
          </Helmet>
          <div className="row justify-content-center">
            <div className="col-xl-10">
              <div className="card">
                <div className="card-body p-0">
                  <div className="row">
                    <div className="col-md-6 p-5">
                      <div className="mx-auto mb-5">
                        <a href="index.html">
                          <img
                            src="assets/images/logo.png"
                            alt=""
                            height={90}
                          />
                        </a>
                      </div>
                      <h6 className="h5 mb-0 mt-4">Welcome back!</h6>
                      <p className="text-muted mt-1 mb-4">
                        Enter your email address and password.
                      </p>
                      <form action="#" className="authentication-form">
                        <div className="form-group">
                          <label className="form-control-label">
                            Email Address
                          </label>
                          <div className="input-group input-group-merge">
                            <div className="input-group-prepend">
                              <span className="input-group-text">
                                <i className="fas fa-at" data-feather="mail" />
                              </span>
                            </div>
                            <input
                              type="email"
                              className="form-control"
                              id="email"
                              placeholder="example@mail.com"
                              onChange={onChangeData}
                              defaultValue={data.email}
                            />
                          </div>
                        </div>
                        <div className="form-group mt-4">
                          <label className="form-control-label">Password</label>
                          <a
                            href="/forget-password"
                            className="float-right text-muted text-unline-dashed ml-1"
                          >
                            Forgot your password?
                          </a>
                          <div className="input-group input-group-merge">
                            <div className="input-group-prepend">
                              <span className="input-group-text">
                                <i
                                  className={isOpen()}
                                  style={styles.password}
                                  onClick={() => setOpenPass(!openPass)}
                                />
                              </span>
                            </div>
                            <input
                              type="password"
                              className="form-control"
                              id="password"
                              placeholder="Enter your password"
                              onChange={onChangeData}
                              defaultValue={data.password}
                              type={openPass ? "text" : "password"}
                            />
                          </div>
                        </div>
                        <div className="form-group mb-4">
                          <div className="custom-control custom-checkbox">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="checkbox-signin"
                              defaultChecked
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="checkbox-signin"
                            >
                              Remember me
                            </label>
                          </div>
                        </div>
                        <div className="form-group mb-0 text-center">
                          <button
                            className="btn btn-primary btn-block"
                            type="submit"
                            onClick={submitForm}
                          >
                            {" "}
                            {isLoading ? "Loading..." : "Login"}
                          </button>
                        </div>
                      </form>
                      <div className="py-3 text-center">
                        {/* <span className="font-size-16 font-weight-bold">
                          Or
                        </span> */}
                      </div>
                    </div>
                    <div className="col-lg-6 d-none d-md-inline-block">
                      <div className="auth-page-sidebar">
                        <div className="overlay" />
                        <div className="auth-user-testimonial">
                          <p className="font-size-24 font-weight-bold text-white mb-1">
                            Stay Safe & Healthy
                          </p>
                          <p className="lead">
                            "Perfect Life comes from Perfect Health"
                          </p>
                          <p>- Anonym</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>{" "}
                {/* end card-body */}
              </div>
              {/* end card */}
              <div className="row mt-3">
                <div className="col-12 text-center">
                  <p className="text-muted">
                    Don't have an account?{" "}
                    <a
                      href="/register"
                      className="text-primary font-weight-bold ml-1"
                    >
                      Sign Up
                    </a>
                  </p>
                </div>{" "}
                {/* end col */}
              </div>
              {/* end row */}
            </div>{" "}
            {/* end col */}
          </div>
          {/* end row */}
        </div>
        {/* end container */}
      </div>
    </div>
  );
}
const styles = {
  password: {
    cursor: "pointer",
  },
};
export default Login;
