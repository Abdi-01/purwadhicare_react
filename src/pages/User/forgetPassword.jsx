import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet-async";
import { API_URL } from "../../constants/API";
import Swal from "sweetalert2";

function ForgetPassword() {
  const [email, setEmail] = useState("");
  let { isLoading } = useSelector((state) => state.user);
  const onChangeEmail = (e) => setEmail(e.target.value);

  const onSubmitForm = (e) => {
    e.preventDefault();

    axios
      .post(API_URL + "/user/forgetPassword", { email })
      .then((res) => {
        Swal.fire("Reset Password!", "reset Password berhasil!", "success");
        console.log("success");
      })
      .catch((err) => {
        Swal.fire(
          "Reset Password Failed!",
          "Email anda tidak terdaftar",
          "error"
        );
        console.log(err);
      });
  };
  return (
    <div className="authentication-bg">
      <div className="account-pages my-5">
        <div className="container">
          <Helmet>
            <title>Forget Password | Purwadhicare</title>
          </Helmet>
          <div className="row justify-content-center">
            <div className="col-xl-6">
              <div className="card">
                <div className="card-body p-0">
                  <div className="row">
                    <div className=" p-5">
                      <div className="mx-auto mb-5">
                        <a href="index.html">
                          <img
                            src="https://i.ibb.co/8dp71H3/logo.png"
                            alt=""
                            height={90}
                          />
                        </a>
                      </div>
                      <h6 className="h5 mb-0 mt-4">
                        Enter your registered email address.
                      </h6>
                      <p className="text-muted mt-1 mb-4">
                        We'll send you an email to reset / change your old
                        password.
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
                              onChange={onChangeEmail}
                              defaultValue={email}
                            />
                          </div>
                        </div>
                        <div className="form-group mb-0 text-center">
                          <button
                            className="btn btn-primary btn-block"
                            type="submit"
                            onClick={onSubmitForm}
                          >
                            {" "}
                            {isLoading ? "Loading..." : "Send"}
                          </button>
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

export default ForgetPassword;
