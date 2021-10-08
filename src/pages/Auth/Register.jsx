import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { register } from "../../redux/actions";
import { Helmet } from "react-helmet-async";

const defaultData = {
  username: "",
  email: "",
  password: "",
};

const Register = () => {
  const dispatch = useDispatch();
  let { isLoading, logError } = useSelector((state) => state.user);

  const [data, setData] = useState(defaultData);
  const [openPass, setOpenPass] = useState(false);
  const [show, setShow] = useState(false);
  const [toLogin, setToLogin] = useState(false);

  const isOpen = () => (openPass ? "fas fa-eye" : "fas fa-eye-slash");

  const onChangeData = (e) => {
    const key = e.target.attributes.id.value;
    const value = e.target.value;
    // console.log(key, value);
    setData((prevData) => ({ ...prevData, [key]: value }));
  };

  const onSubmitForm = (e) => {
    console.log(data);
    e.preventDefault();

    dispatch(register(data, setToLogin));
  };

  useEffect(() => {
    if (!!logError.length) setShow(true);
  }, [logError]);

  if (toLogin === true) return <Redirect to="/login" />;
  return (
    <div className="authentication-bg">
      <div className="account-pages my-5">
        <div className="container">
          <Helmet>
            <title>Register | Purwadhicare</title>
          </Helmet>
          <div className="row justify-content-center">
            <div className="col-xl-10">
              <div className="card">
                <div className="card-body p-0">
                  <div className="row">
                    <div className="col-lg-6 p-5">
                      <div className="mx-auto mb-5">
                        <a href="index.html">
                          <img src="assets/images/logo.png" alt="" height={90} />
                          {/* <h3 className="d-inline align-middle ml-1 text-logo">
                            Purwadicare
                          </h3> */}
                        </a>
                      </div>
                      <h6 className="h5 mb-0 mt-4">Create your account</h6>
                      <p className="text-muted mt-0 mb-4">Create a free account and start using Purwadhicare</p>
                      <form action="#" className="authentication-form">
                        <div className="form-group">
                          <label className="form-control-label">Username</label>
                          <div className="input-group input-group-merge">
                            <div className="input-group-prepend">
                              <span className="input-group-text">
                                <i className="fas fa-user" data-feather="user" />
                              </span>
                            </div>
                            <input
                              type="text"
                              className="form-control"
                              id="username"
                              placeholder="Your username"
                              defaultValue={data.username}
                              onChange={onChangeData}
                            />
                          </div>
                        </div>
                        <div className="form-group">
                          <label className="form-control-label">Email Address</label>
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
                              placeholder="user@mail.com"
                              defaultValue={data.email}
                              onChange={onChangeData}
                            />
                          </div>
                        </div>
                        <div className="form-group ">
                          <label className="form-control-label">Password</label>
                          <div className="input-group input-group-merge">
                            <div className="input-group-prepend">
                              <span className="input-group-text">
                                <i className={isOpen()} style={styles.password} onClick={() => setOpenPass(!openPass)} />
                              </span>
                            </div>
                            <input
                              type={openPass ? "text" : "password"}
                              className="form-control"
                              id="password"
                              placeholder="Enter your password"
                              defaultValue={data.password}
                              onChange={onChangeData}
                            />
                          </div>
                          <small style={{ color: "grey", fontSize: 12 }}>
                            * Password must have min 5 character, include number and symbol
                          </small>
                        </div>
                        <div className="form-group mb-0 text-center">
                          <button className="btn btn-primary btn-block" type="submit" onClick={onSubmitForm} disabled={isLoading}>
                            {isLoading === true ? "Loading..." : "Sign Up"}
                          </button>
                        </div>
                      </form>
                    </div>
                    <div className="col-lg-6 d-none d-md-inline-block">
                      <div className="auth-page-sidebar">
                        <div className="overlay" />
                        <div className="auth-user-testimonial">
                          <p className="font-size-24 font-weight-bold text-white mb-1">Stay Safe & Healthy</p>
                          <p className="lead">"Perfect Life comes from Perfect Health"</p>
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
                    Already have account?{" "}
                    <a href="/login" className="text-primary font-weight-bold ml-1">
                      Login
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
};
const styles = {
  password: {
    cursor: "pointer",
  },
};
export default Register;
