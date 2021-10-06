import axios from "axios";
import React from "react";
import { Helmet } from "react-helmet-async";
class Verification extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "Loading...",
    };
  }

  componentDidMount() {
    axios
      .patch(
        `http://localhost:2200/user/verified`,
        {},
        {
          headers: {
            Authorization: `Bearer ${this.props.match.params.token}`,
          },
        }
      )
      .then((res) => {
        this.setState({ message: "Your Account is Verified ✔" });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  render() {
    return (
      // <div className="container p-5">
      //   <h2>{this.state.message}</h2>
      //   <h2>
      //     <a href="/login">Back to Login Page</a>
      //   </h2>
      // </div>
      <div className="authentication-bg">
        <div className="account-pages my-5">
          <div className="container">
            <Helmet>
              <title>Verification | Purwadhicare</title>
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
                        <form action="#" className="authentication-form">
                          <div className="row mt-3">
                            <div className="col-12 text-center">
                              <h2>{this.state.message}</h2>
                              <p className="text-muted">
                                <h2>
                                  <a href="/login">Back to Login Page</a>
                                </h2>
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
}

export default Verification;
