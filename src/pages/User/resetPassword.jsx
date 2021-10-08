import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { API_URL } from "../../constants/API";

function ResetPassword() {
  const location = useLocation();
  const token = location.pathname.split("/")[2];
  //   console.log(token);
  let { isLoading } = useSelector((state) => state.user);
  const [toLogin, setToLogin] = useState(false);
  const [openPass, setOpenPass] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const isOpen = () => (openPass ? "fas fa-eye" : "fas fa-eye-slash");
  const onChangePassword = (e) => setNewPassword(e.target.value);

  const onSubmitForm = (e) => {
    e.preventDefault();

    axios
      .post(API_URL + "/user/resetPassword", {
        token,
        password: newPassword,
      })
      .then((res) => {
        alert("Your New Password is Set ✔️");
        setToLogin(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="authentication-bg">
      <div className="account-pages my-5">
        <div className="container">
          <Helmet>
            <title>Reset Password | Purwadhicare</title>
          </Helmet>
          <div className="row justify-content-center">
            <div className="col-xl-6">
              <div className="card">
                <div className="card-body p-0">
                  <div className="row">
                    <div className=" p-5">
                      <div className="mx-auto mb-5">
                        <a href="index.html">
                          <img src="https://i.ibb.co/8dp71H3/logo.png" alt="" height={90} />
                        </a>
                      </div>
                      <h6 className="h5 mb-0 mt-4">Let's Change Your Password!</h6>
                      <p className="text-muted mt-1 mb-4">Enter Your New Password</p>
                      <form action="#" className="authentication-form">
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
                              defaultValue={newPassword}
                              onChange={onChangePassword}
                            />
                          </div>
                          <small style={{ color: "grey", fontSize: 12 }}>
                            * Password must have min 5 character, include number and symbol
                          </small>
                        </div>
                        <div className="form-group mb-0 text-center">
                          <button className="btn btn-primary btn-block" type="submit" onClick={onSubmitForm} disabled={isLoading}>
                            {isLoading === true ? "Loading..." : "Change Password"}
                          </button>
                        </div>
                        <div className="row mt-3">
                          <div className="col-12 text-center">
                            <p className="text-muted">
                              {toLogin === false ? (
                                "Back To Login Page"
                              ) : (
                                <a href="/login" className="text-primary font-weight-bold ml-1" disabled={isLoading}>
                                  Back To Login Page
                                </a>
                              )}
                            </p>
                          </div>{" "}
                          {/* end col */}
                        </div>
                      </form>
                    </div>
                  </div>
                </div>{" "}
                {/* end card-body */}
              </div>
              {/* end card */}
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
export default ResetPassword;
