import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => (
  <div>
    <div className="account-pages my-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-4 col-lg-5 col-8">
            <div className="text-center">
              <div>
                <img src="assets/images/not-found.png" alt="" className="img-fluid" />
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12 text-center">
            <h3 className="mt-3">We couldn’t connect the dots</h3>
            <p className="text-muted mb-5">
              This page was not found. <br /> You may have mistyped the address or the page may have moved.
            </p>
            <div className="btn btn-lg btn-primary mt-4">
              <Link to="/">
                <span className="text-white">Go Home</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* end container */}
    </div>
  </div>
);

export default NotFound;
