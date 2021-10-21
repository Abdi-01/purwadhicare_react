/* eslint-disable react-hooks/exhaustive-deps */
import "../../assets/styles/cart.css";
import React, { useEffect, useState } from "react";
import Axios from "axios";
import { API_URL } from "../../constants/API";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";

function Cart() {
  const globalCart = useSelector((state) => state.cart);
  const globalUser = useSelector((state) => state.user);
  const history = useHistory();
  const [cart, setCart] = useState([]);
  const [cities, setCities] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [courier, setCourier] = useState([]);
  const [shipping, setShipping] = useState({
    idprovince: 0,
    idcity: 0,
    full_name: "",
    phone_number: "",
    address: "",
    districts: "",
    postal_code: "",
    notes: "",
  });
  const [totalPrice, setTotalPrice] = useState({
    subTotal: 0,
    ongkir: 0,
    total: 0,
    jasa: false,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchCart();
    fetchProvince();
    setIsLoading(false);
  }, []);


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

  useEffect(() => {
    renderSubTotal();
  }, [cart]);

  useEffect(() => {
    renderTotalPrice();
  }, [totalPrice.ongkir]);

  const fetchCart = () => {
    Axios.get(`http://localhost:2200/cart/get?iduser=${globalUser.user.iduser}`)
      .then((result) => {
        setCart(result.data);
      })
      .catch((err) => {
        alert("Terjadi kesalahan server");
        console.log(err);
      });
  };

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

  const renderSubTotal = () => {
    const total = cart.reduce((result, item) => {
      return result + item.quantity * item.price_stock;
    }, 0);
    setTotalPrice({ ...totalPrice, subTotal: total, total: total });
  };

  const formHandler = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    setShipping({ ...shipping, [name]: value });
  };

  const renderTotalPrice = () => {
    const total = totalPrice.ongkir + totalPrice.subTotal;
    setTotalPrice({ ...totalPrice, total });
  };

  const ongkirBtnHandler = (totalOngkir, jasa) => {
    setTotalPrice({ ...totalPrice, ongkir: totalOngkir, jasa: `JNE ${jasa}` });
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

  const submitBtnHandler = (e) => {
    e.preventDefault();
    const { full_name, phone_number, address, districts, postal_code, notes, idprovince, idcity } = shipping;
    const { total } = totalPrice;
    let formShipping = {
      full_name,
      phone_number,
      address,
      districts,
      postal_code,
      notes,
      province: idprovince,
      city: idcity,
    };
    Axios.post(
      API_URL + "/order/product",
      {
        formShipping,
        cart,
        total,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
      .then(() => {
        Axios.patch(API_URL + "/product/row", { cart })
          .then(() => {
            cart.forEach((val) => {
              deleteCartHandler(val.idcart);
            });
            Swal.fire({
              icon: "success",
              title: "Berhasil Order Product",
              text: "Silahkan lakukan pembayaran sebelum kami mengirimkan obatnya",
            }).then((result) => {
              history.push("/history");
            });
          })
          .catch((err) => {
            alert("gagal");
          });
      })
      .catch((err) => {
        alert("gagal");
        console.log(err);
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
              <button onClick={() => deleteCartHandler(val.idcart)} className="btn btn-danger">
                Delete
              </button>
            </div>
          </div >
        </div >
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
                      <td>{val.cost[0].etd} Hari</td>
                      <td>Rp. {val.cost[0].value}</td>
                      <td>
                        <button
                          className="btn btn-secondary btn-sm"
                          onClick={() => ongkirBtnHandler(val.cost[0].value, val.service)}
                        >
                          Pilih
                        </button>
                      </td>
                    </tr>
                  );
                });
              })
              : null}
          </tbody >
        </table >
      </div >
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
        <form onSubmit={submitBtnHandler}>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Nama Lengkap</label>
            <input type="text" className="form-control" name="full_name" placeholder="Nama Lengkap" onChange={formHandler} />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Nomor Telepon</label>
            <input type="text" className="form-control" name="phone_number" placeholder="Nomor telepon" onChange={formHandler} />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Alamat</label>
            <textarea name="address" className="form-control" cols="30" rows="4" onChange={formHandler} />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Provinsi</label>
            <select className="form-control" defaultValue={"DEFAULT"} name="idprovince" onChange={formHandler}>
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
            <select className="form-control" defaultValue={"DEFAULT"} name="idcity" onChange={formHandler}>
              <option disabled value="DEFAULT">
                Nama Kota
              </option>
              {cities.map((value, idx) => {
                return <option value={value.idcity} key={idx}>{`${value.type} ${value.city_name}`}</option>;
              })}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Kecamatan</label>
            <input type="text" className="form-control" name="districts" placeholder="Kecamatan" onChange={formHandler} />
          </div >
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Kode Pos</label>
            <input type="text" className="form-control" name="postal_code" placeholder="Kode Pos" onChange={formHandler} />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Catatan</label>
            <input type="text" className="form-control" name="notes" placeholder="Catatan" onChange={formHandler} />
          </div>
          {
            totalPrice.jasa ? (
              <div className="row" style={{ padding: "2vh 0" }}>
                <div className="col">Jasa</div>
                <div className="col text-right">{totalPrice.jasa}</div>
              </div>
            ) : null
          }

          <div className="row" style={{ borderTop: "1px solid rgba(0,0,0,.1)", padding: "2vh 0" }}>
            <div className="col">Total Harga</div>
            <div className="col text-right">RP {totalPrice.total}</div>
          </div>
          <button className="btn btn-primary btn-block">CHECKOUT</button>
        </form >
      </div >
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
                    <div className="col align-self-center text-right text-muted">{cart.length} Produk</div>
                  </div >
                </div >
                {renderCart()}
                < div className="back-to-shop" >
                  <Link to="/productlist">
                    <span className="text-muted">
                      ← <br />
                      Back to shop
                    </span>
                  </Link>
                </div >
                {renderOngkir()}
              </div >
              {renderShipping()}
            </div >
          </div >
        </div >
      </div >
    );
  }
}

export default Cart;
