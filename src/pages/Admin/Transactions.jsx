/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Button, Modal } from "react-bootstrap";
import { API_URL } from "../../constants/API";
import axios from "axios";
import Swal from "sweetalert2";

function Transactions() {
  const globalUser = useSelector((state) => state.user);
  const [userData, setUserData] = useState([]);
  return (
    <div className="content-user">
      <div className="content">
        <div className="container-fluid pl-5">
          <div className="container pt-4">
            <h2 className="text-center">Daftar Transaksi User</h2>
            <div className="line mb-4" />
            <div className="pb-4">
              <div className="card w-full shadow-lg">
                <div className="card-body">
                  <div className="row mb-1">
                    <div className="col-md-10">
                      <h6 className="text-muted font-weight-light">
                        Id Transaksi: 12211
                      </h6>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-3">
                      <div className="row">
                        <div className="col">
                          <h6 className=" m-0">Harga Obat</h6>
                          <p className="text-secondary">Rp.121.111</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="row">
                        <i className="bi bi-calendar-event" />
                        <div className="col">
                          <h6 className="m-0">Tanggal 24 januari 2020</h6>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <span className="btn btn-warning btn-sm disabled text-white">
                        Menunggu Pengiriman
                      </span>
                    </div>
                    <div className="col-md-2 text-center">
                      <button className="btn btn-info">Lihat Detail</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Transactions;
