import React, { useEffect, useState } from "react";
import Axios from "axios";
import { API_URL } from "../../constants/API";
import moment from "moment";
import "moment/locale/id";
import { Link } from "react-router-dom";

const OrderRecipe = () => {
  const [orderData, setOrderData] = useState([]);

  useEffect(() => {
    fetchOrder();
  }, []);

  const fetchOrder = () => {
    Axios.get(API_URL + "/order/recipe-admin")
      .then((res) => {
        setOrderData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const renderRecipe = () => {
    return orderData.map((val, index) => {
      return (
        <tr key={index}>
          <th scope="row">{index + 1}</th>
          <td>{val.full_name}</td>
          <td>{val.email}</td>
          <td>{val.age} Tahun</td>
          <td>{moment(val.order_date).format("LL")}</td>
          <td>
            <Link to={`/order-recipe/${val.idorder}`}>
              <button className="btn btn-primary btn-sm">Input Obat</button>
            </Link>
          </td>
        </tr>
      );
    });
  };

  return (
    <div className="content-page">
      <div className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-body">
                  <h4 className="header-title mt-0 mb-1">List Order Recipe</h4>
                  <p className="sub-header">
                    Menampilkan kesulurhan daftar order product berdasarkan resep racikan dokter yang belum diproses oleh admin.
                  </p>
                  <div className="table-responsive">
                    <table className="table m-0">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Nama Lengkap</th>
                          <th>Email</th>
                          <th>Umur</th>
                          <th>Tanggal Order</th>
                          <th>Aksi</th>
                        </tr>
                      </thead>
                      <tbody>{renderRecipe()}</tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderRecipe;
