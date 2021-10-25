import React from "react";

function FooterUser() {
  return (
    <div>
      <footer
        className="pt-5 pb-3 position-relative"
        style={{
          background: 'url("assets/images/covers/pattern.png") center top',
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <a href="index.html" className="navbar-brand mr-lg-5 font-size-22 font-weight-bold text-dark">
                <img src="/assets/images/logo.png" alt="" className="logo-dark mr-2" height={42} />
              </a>
              <p className="font-size-15 mt-4">
                Purwadhicare menyediakan layanan jual beli
                <br /> obat satuan maupun jual beli obat racikan.
                <br /> Proses cepat dengan biaya pengiriman yang murah.
              </p>
            </div>
            <div className="col-lg-2"></div>
            <div className="col-lg-2"></div>
            <div className="col-lg-2">
              <h5>Help</h5>
              <ul className="list-unstyled pl-0 mb-0 mt-3">
                <li className="mt-2">
                  <a href="https://coderthemes.com/" className="text-dark">
                    Get Support
                  </a>
                </li>
                <li className="mt-2">
                  <a href="docs.html" className="text-dark">
                    Documentation
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="mt-5">
                <p className="mt-4 text-center mb-0">© 2021 Purwadhicare. All right reserved</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default FooterUser;
