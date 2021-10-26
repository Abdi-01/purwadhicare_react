import React, { useState, useEffect } from "react";
import Axios from "axios";
import { API_URL } from "../../constants/API";
import { formatRupiah } from "../../helpers/formatRupiah";
import ReactToExcel from "react-html-table-to-excel";

function Dashboard() {
  const [report, setReport] = useState([]);
  const [card, setCard] = useState({});

  useEffect(() => {
    fetchReport();
  }, []);
  useEffect(() => {
    fetchCard();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [report]);

  const fetchReport = () => {
    Axios.get(API_URL + "/order/sales-report")
      .then((res) => {
        setReport(res.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchCard = () => {
    let botol = 0;
    let netto = 0;
    let harga = 0;
    report.forEach((val) => {
      if (val.unit === "mg") {
        netto += parseFloat(val.product_netto / 1000);
      } else {
        netto += parseFloat(val.product_netto);
      }
      botol += parseInt(val.stok);
      harga += parseInt(val.product_price);
    });

    setCard({
      botol,
      netto,
      harga,
    });
  };

  const renderReport = () => {
    return (
      <div className="table-responsive mt-4">
        <table className="table table-hover table-nowrap mb-0" id="table-to-xls">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Produk</th>
              <th scope="col">Stok Terjual</th>
              <th scope="col">Netto Terjual</th>
              <th scope="col">Sisa Netto</th>
              <th scope="col">Harga Total</th>
            </tr>
          </thead>
          <tbody>
            {report.map((val) => {
              return (
                <tr key={val.row_number}>
                  <th scope="row">{val.row_number}</th>
                  <td>{val.product_name}</td>
                  <td>{val.stok} Botol</td>
                  <td>
                    {val.product_netto} {val.unit}
                  </td>
                  <td>
                    {val.sisa_netto} {val.unit}
                  </td>
                  <td>{formatRupiah(val.product_price)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="content-page">
      <div className="content">
        <div className="container-fluid">
          <div className="row page-title align-items-center">
            <div className="col-sm-4 col-xl-6">
              <h4 className="mb-1 mt-0">Sales Report</h4>
            </div>
          </div>
          {/* content */}
          <div className="row">
            <div className="col-md-6 col-xl-3">
              <div className="card">
                <div className="card-body p-0">
                  <div className="media p-3">
                    <div className="media-body">
                      <span className="text-uppercase font-size-12 font-weight-bold text-primary">Total Penjualan</span>
                      <h2 className="mb-0">{formatRupiah(card.harga)}</h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-xl-3 ">
              <div className="card">
                <div className="card-body p-0">
                  <div className="media p-3">
                    <div className="media-body">
                      <span className="text-success text-uppercase font-size-12 font-weight-bold">Botol Terjual</span>
                      <h2 className="mb-0">{card.botol} Botol</h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-xl-3">
              <div className="card">
                <div className="card-body p-0">
                  <div className="media p-3">
                    <div className="media-body">
                      <span className="text-info text-uppercase font-size-12 font-weight-bold">Netto terjual</span>
                      <h2 className="mb-0">{card.netto} ml</h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* stats + charts */}

          {/* row */}
          {/* products */}
          <div className="row">
            {/* end col*/}
            <div className="col-xl-12">
              <div className="card">
                <div className="card-body">
                  <ReactToExcel
                    className="btn btn-primary btn-sm float-right"
                    table="table-to-xls"
                    filename="SalesReport"
                    sheet="report"
                    buttonText="Export Excel"
                  />
                  <h5 className="card-title mt-0 mb-0 header-title">Product Orders</h5>
                  {renderReport()}
                  {/* end table-responsive*/}
                </div>
                {/* end card-body*/}
              </div>
              {/* end card*/}
            </div>
            {/* end col*/}
          </div>
          {/* end row */}
        </div>
      </div>
      {/* content */}
    </div>
  );
}

export default Dashboard;
