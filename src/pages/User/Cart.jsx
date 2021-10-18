/* eslint-disable react-hooks/exhaustive-deps */
import "../../assets/styles/cart.css";
import React, { useEffect, useState } from "react";
import Axios from "axios";
import { API_URL } from "../../constants/API";
import { useSelector, useDispatch } from "react-redux";
import { getCartData } from "../../redux/actions";
import { propTypes } from "react-bootstrap/esm/Image";

function Cart() {
  const [cities, setCities] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [cart, setCart] = useState([]);
  const [courier, setCourier] = useState([]);
  const [shipping, setShipping] = useState({
    idprovince: 0,
    idcity: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const globalCart = useSelector((state) => state.cart);
  const globalUser = useSelector((state) => state.user);

  // get data
  useEffect(() => {
    fetchProvince();
    fetchCart();
    setIsLoading(false);
  }, []);

  // get data kalo ada perubahan
  useEffect(() => {
    fetchCity();
  }, [shipping.idprovince]);

  // ongkir
  useEffect(() => {
    fetchOngkir();
  }, [shipping.idcity]);

  const fetchProvince = () => {
    Axios.get(API_URL + "/ongkir/province")
      .then((res) => {
        setProvinces(res.data);
      })
      .catch(() => {
        alert("Kesalahan server");
      });
  };

  const fetchCity = () => {
    Axios.get(API_URL + "/ongkir/city/" + shipping.idprovince)
      .then((res) => {
        setCities(res.data);
      })
      .catch(() => {
        alert("Kesalahan server");
      });
  };

  const fetchOngkir = () => {
    Axios.post(API_URL + "/ongkir/cost", {
      params: {
        destination: shipping.idcity,
      },
    })
      .then((res) => {
        setCourier(res.data);
      })
      .catch((err) => {
        alert("Kesalahan Server");
      });
  };

  const formHandler = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    setShipping({ ...shipping, [name]: value });
  };

  const fetchCart = () => {
    Axios.get(`http://localhost:2200/cart/get?iduser=${globalUser.user.iduser}`)
      .then((result) => {
        console.log(result);
        setCart(result.data);
      })
      .catch((err) => {
        alert("Terjadi kesalahan server");
        console.log(err);
      });
  };

  const deleteCartHandler = (idcart) => {
    Axios.delete(`http://localhost:2200/cart/delete-cart/${idcart}`)
      .then(() => {
        fetchCart();
        alert("Berhasil Delete Cart");
      })
      .catch(() => {
        alert("Gagal Delete");
      });
  };

  const renderCart = () => {
    return cart.map((val) => {
      return (
        <div className="row border-top border-bottom">
          <div className="row main-cart align-items-center p-4">
            <div className="col-2">
              <img className="img-fluid" src={val.image} alt="img" />
            </div>
            <div className="col">
              <div className="row text-muted">{val.product_name}</div>
            </div>
            <div className="col">
              <div className="border">{val.quantity}</div>
            </div>
            <div className="col">Rp. {val.price_stock}</div>
            {/* total price per item */}
            <div className="col">Rp. {val.quantity * val.price_stock}</div>
            <div className="col">
              <button
                onClick={() => deleteCartHandler(val.idcart)}
                className="btn btn-danger"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      );
    });
  };

  const renderOngkir = () => {
    return (
      <div className="back-to-shop p-4 mt-3">
        <table className="table mt-5 p-4">
          <caption>Daftar Jasa Pengiriman</caption>
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Servis</th>
              <th scope="col">Deskripsi</th>
              <th scope="col">Waktu Pengiriman</th>
              <th scope="col">Biaya Pengiriman</th>
              <th scope="col">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {courier.length
              ? courier.map((value) => {
                  return value.costs.map((val, index) => {
                    // console.log(val.service);
                    return (
                      <tr>
                        <th scope="row">{index + 1}</th>
                        <td>{val.service}</td>
                        <td>{val.description}</td>
                        <td>{val.cost[0].etd}</td>
                        <td>{val.cost[0].value}</td>
                        <td>
                          <button className="btn btn-primary">Pilih</button>
                        </td>
                      </tr>
                    );
                  });
                })
              : null}
          </tbody>
        </table>
      </div>
    );
  };

  const renderShipping = () => {
    return (
      <div className="col-md-4 summary">
        <div>
          <h5>
            <b>Detail Pengiriman</b>
          </h5>
        </div>
        <hr />
        <form>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Nama Lengkap</label>
            <input
              type="text"
              className="form-control"
              placeholder="Nama Lengkap"
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Nomor Telepon</label>
            <input
              type="text"
              className="form-control"
              placeholder="Nomor telepon"
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Alamat</label>
            <textarea
              name=""
              id=""
              className="form-control"
              cols="30"
              rows="4"
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Provinsi</label>
            <select
              className="form-control"
              defaultValue={"DEFAULT"}
              name="idprovince"
              onChange={formHandler}
            >
              <option disabled value="DEFAULT">
                Nama Provinsi
              </option>
              {provinces.map((value, index) => {
                return (
                  <option value={value.idprovince} key={index}>
                    {value.province}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Kota / Kabupaten</label>
            <select
              className="form-control"
              defaultValue={"DEFAULT"}
              name="idcity"
              onChange={formHandler}
            >
              <option disabled value="DEFAULT">
                Nama Kota
              </option>
              {cities.map((value, idx) => {
                return (
                  <option
                    value={value.idcity}
                    key={idx}
                  >{`${value.type} ${value.city_name}`}</option>
                );
              })}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Kecamatan</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Kode Pos</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Catatan</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter email"
            />
          </div>
        </form>
        <div
          className="row"
          style={{ borderTop: "1px solid rgba(0,0,0,.1)", padding: "2vh 0" }}
        >
          <div className="col">TOTAL PRICE</div>
          <div className="col text-right">€ 137.00</div>
        </div>
        <button className="btn-cart">CHECKOUT</button>
      </div>
    );
  };

  if (isLoading) {
    return <h2>Loading...</h2>;
  } else {
    return (
      <div className="content-user mb-4">
        <div className="content">
          <div className="card-cart">
            <div className="row">
              <div className="col-md-8 cart">
                <div className="title-cart">
                  <div className="row">
                    <div className="col">
                      <h4>
                        <b>Keranjang</b>
                      </h4>
                    </div>
                    <div className="col align-self-center text-right text-muted">
                      3 items
                    </div>
                  </div>
                </div>
                {renderCart()}
                <div className="back-to-shop">
                  <div>←</div>
                  <span className="text-muted">Back to shop</span>
                </div>
                {renderOngkir()}
              </div>
              {renderShipping()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Cart;
