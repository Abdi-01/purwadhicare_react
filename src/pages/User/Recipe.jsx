/* eslint-disable react-hooks/exhaustive-deps */
import "../../assets/styles/cart.css";
import React, { useEffect, useState } from "react";
import Axios from "axios";
import { API_URL } from "../../constants/API";

function Recipe() {
  const [cities, setCities] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [shipping, setShipping] = useState({
    idprovince: 0,
    idcity: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProvince();
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchCity();
  }, [shipping.idprovince]);

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

  const formHandler = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    setShipping({ ...shipping, [name]: value });
  };

  const renderShipping = () => {
    return (
      <div className="col-md-8 summary">
        <div>
          <h5>
            <b>Detail Pengiriman</b>
          </h5>
        </div>
        <hr />
        <form>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Nama Lengkap</label>
            <input type="text" className="form-control" placeholder="Nama Lengkap" />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Nomor Telepon</label>
            <input type="text" className="form-control" placeholder="Nomor telepon" />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Alamat</label>
            <textarea name="" id="" className="form-control" cols="30" rows="4" />
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
            <input type="text" className="form-control" placeholder="Enter email" />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Kode Pos</label>
            <input type="text" className="form-control" placeholder="Enter email" />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Catatan</label>
            <input type="text" className="form-control" placeholder="Enter email" />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">File Resep</label>
            <input type="file" className="form-control" placeholder="Enter email" />
          </div>
        </form>
        <div className="row" style={{ borderTop: "1px solid rgba(0,0,0,.1)", padding: "2vh 0" }}>
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
            <div className="row justify-content-md-center">{renderShipping()}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Recipe;
