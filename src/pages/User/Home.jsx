import React from "react";
import { Carousel } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import banner1 from "../../assets/images/Banner1.jpg";
import banner2 from "../../assets/images/Banner2.jpg";
import banner3 from "../../assets/images/Banner3.jpg";
import "../../assets/styles/home.css";
import { Link } from "react-router-dom";

// import "../../assets/styles/style.css";
const Home = () => {
  return (
    <div className="content-user">
      <div className="content">
        <div className="container-fluid "></div>
        <Helmet>
          <title>Home | Purwadhicare</title>
        </Helmet>
        <Carousel fade>
          <Carousel.Item>
            <img className="d-block w-100" src={banner3} alt="First slide" />
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100" src={banner1} alt="Second slide" />
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100" src={banner2} alt="Third slide" />
          </Carousel.Item>
        </Carousel>
        <section className="section pb-5 home" id="features">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="text-center">
                  <p className="title-sub-heading text-primary f-18">Tentang Kami</p>
                  <h2 className="title-heading">Purwadhicare, Penjualan obat terpercaya</h2>
                  <p className="title-desc text-muted mt-2">
                    Purwadhicare menyediakan obat yang dapat dipesan langsung maupun dipesan melalui resep
                  </p>
                </div>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-lg-4">
                <div className="features-box mt-4">
                  <h1 className="features-title">01</h1>

                  <h5 className="f-18 mt-4">Obat Satuan</h5>
                  <p className="text-muted mt-3">
                    Kami menyediakan penjualan obat satuan yang dapat dipesan dalam bentuk sachet, botol dan lain lain.
                  </p>
                  <div className="mt-3">
                    <div className="text-primary font-weight-600">
                      <span className="pointer">
                        Lihat menu <i className="mdi mdi-arrow-right ml-2" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="features-box mt-4">
                  <h1 className="features-title">02</h1>

                  <h5 className="f-18 mt-4">Obat Racikan</h5>
                  <p className="text-muted mt-3">Kami menyediakan penjualan obat melalui resep dokter yang telah diberikan.</p>
                  <div className="mt-3">
                    <div className="text-primary font-weight-600">
                      <span className="pointer">
                        Lihat menu <i className="mdi mdi-arrow-right ml-2" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="features-box mt-4">
                  <h1 className="features-title">03</h1>

                  <h5 className="f-18 mt-4">Obat Termurah</h5>
                  <p className="text-muted mt-3">
                    tentunya kami menyediakan semua jenis obat dengan harga yang relatif lebih murah dibandingkan toko lain.
                  </p>
                  <div className="mt-3">
                    <div className="text-primary font-weight-600">
                      <span className="pointer">
                        Lihat Menu <i className="mdi mdi-arrow-right ml-2" />{" "}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="section bg-light mb-5">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-8">
                <div className="text-center">
                  <h2>
                    Jika anda mempunyai <span className="text-primary">Resep Dokter </span> silahkan dapat memesan melalui tombol
                    dibawah ini.
                  </h2>
                  <div className="search-form mt-5">
                    <form>
                      <Link to="/recipe">
                        <button type="submit" className="btn btn-primary">
                          Upload Resep
                        </button>
                      </Link>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
