/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Axios from "axios";
import { API_URL } from "../../constants/API";
import { Button, Modal, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";

const OrderDetailRecipe = (props) => {
  const [filterProductList, setFilterProductList] = useState([]);
  const [shipping, setShipping] = useState([]);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(0);
  const [itemPerPage, setItemPerPage] = useState(7);
  const [show, setShow] = useState(false);
  const [courier, setCourier] = useState([]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [totalPrice, setTotalPrice] = useState({
    subTotal: 0,
    ongkir: 0,
    total: 0,
    jasa: false,
  });
  const { idorder } = useParams();

  useEffect(() => {
    fetchProduct();
    fetchShipping();
    fetchOngkir();
  }, []);

  const fetchProduct = () => {
    Axios.get(API_URL + "/product/inventory/")
      .then((res) => {
        setFilterProductList(res.data[0]);
        setMaxPage(Math.ceil(res.data[0].length / itemPerPage));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const fetchShipping = () => {
    Axios.get(API_URL + `/order/detail-recipe-admin/${idorder}`)
      .then((res) => {
        setShipping(res.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const fetchOngkir = () => {
    var weight = 0.1;
    // cart.forEach((val) => {
    //   if (val.unit === "mg") {
    //     weight += (val.netto / 1000) * val.quantity;
    //   } else {
    //     weight += val.netto * val.quantity;
    //   }
    // });
    Axios.post(API_URL + "/ongkir/cost", {
      destination: shipping.city,
      weight,
    })
      .then((res) => {
        console.log(res.data);
        setCourier(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const nextPageHandler = () => {
    if (page < maxPage) {
      setPage(page + 1);
    }
  };

  const prevPageHandler = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const ongkirBtnHandler = (totalOngkir, jasa) => {
    setTotalPrice({ ...totalPrice, ongkir: totalOngkir, jasa: `JNE ${jasa}` });
  };

  const renderProduct = () => {
    const beginningIndex = (page - 1) * itemPerPage;
    let rawData = [...filterProductList];
    const currentData = rawData.slice(beginningIndex, beginningIndex + itemPerPage);

    return currentData.map((val) => {
      // Belum selesai
      if (val.idproduct) {
        return (
          <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
              <Modal.Title>Edit Stock Product</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>Input Netto</Form.Label>
                  <Form.Control type="text" name="productName" />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary">Save Changes</Button>
            </Modal.Footer>
          </Modal>
        );
      }

      return (
        <tr key={val.row_number}>
          <th scope="row">{val.row_number}</th>
          <td>{val.product_name}</td>
          <td>{val.stock_bottle} Botol</td>
          <td>{val.netto > 0 ? `${val.netto} ${val.unit}` : "Stok Kosong"}</td>
          <td>{val.total_netto > 0 ? `${val.total_netto} ${val.unit}` : "Stok Kosong"}</td>
          <td>
            <button className="btn btn-primary btn-sm" onClick={handleShow}>
              Edit Stok
            </button>
          </td>
        </tr>
      );
    });
  };

  const renderAddStock = () => {
    return (
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Stock Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Input Netto</Form.Label>
              <Form.Control type="text" name="productName" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary">Save Changes</Button>
        </Modal.Footer>
      </Modal>
    );
  };

  const renderShipping = () => {
    return (
      <div className="summary">
        <div>
          <h5>
            <b>Detail Pengiriman</b>
          </h5>
        </div>
        <hr />
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Nama Lengkap</label>
          <input type="text" className="form-control" readOnly defaultValue={shipping.full_name} />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Nomor Telepon</label>
          <input type="text" className="form-control" readOnly defaultValue={shipping.phone_number} />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Alamat</label>
          <textarea name="address" className="form-control" cols="30" rows="4" readOnly defaultValue={shipping.address} />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Provinsi</label>
          <input type="text" className="form-control" readOnly defaultValue={shipping.province} />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Kota / Kabupaten</label>
          <input type="text" className="form-control" readOnly value={shipping.type + " " + shipping.city_name} />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Kecamatan</label>
          <input type="text" className="form-control" readOnly defaultValue={shipping.districts} />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Kode Pos</label>
          <input type="text" className="form-control" readOnly defaultValue={shipping.postal_code} />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Catatan</label>
          <input type="text" className="form-control" readOnly defaultValue={shipping.notes} />
        </div>
        {totalPrice.jasa ? (
          <div className="row" style={{ padding: "2vh 0" }}>
            <div className="col">Jasa</div>
            <div className="col text-right">{totalPrice.jasa}</div>
          </div>
        ) : null}

        <div className="row" style={{ borderTop: "1px solid rgba(0,0,0,.1)", padding: "2vh 0" }}>
          <div className="col">Total Harga</div>
          <div className="col text-right">RP {totalPrice.total}</div>
        </div>
      </div>
    );
  };

  const renderOngkir = () => {
    return (
      <div className="back-to-shop">
        <table className="table">
          <caption>
            Daftar Jasa Pengiriman <b>JNE</b>
          </caption>
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
                    return (
                      <tr key={index}>
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
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="content-page">
      <div className="content">
        <div className="container-fluid">
          {renderAddStock()}
          <div className="row">
            <div className="col-7">
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
                          <th>Nama Obat</th>
                          <th>Stok Tersedia</th>
                          <th>Netto perBotol</th>
                          <th>Total Netto</th>
                          <th>Aksi</th>
                        </tr>
                      </thead>
                      <tbody>{renderProduct()}</tbody>
                    </table>
                    <ul className="pagination pagination-rounded">
                      <li className="paginate_button page-item previous" id="basic-datatable_previous">
                        <button
                          disabled={page === 1}
                          aria-controls="basic-datatable"
                          onClick={prevPageHandler}
                          className="page-link"
                        >
                          <i className="uil uil-angle-left" />
                        </button>
                      </li>
                      <li className="paginate_button page-item disabled">
                        <span className="page-link">
                          Page {page} of {maxPage}{" "}
                        </span>
                      </li>
                      <li className="paginate_button page-item next" id="basic-datatable_next">
                        <button
                          disabled={page === maxPage}
                          aria-controls="basic-datatable"
                          onClick={nextPageHandler}
                          className="page-link"
                        >
                          <i className="uil uil-angle-right" />
                        </button>
                      </li>
                    </ul>
                    {renderOngkir()}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-5">{renderShipping()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailRecipe;
