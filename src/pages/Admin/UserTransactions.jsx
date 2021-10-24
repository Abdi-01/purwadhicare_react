import React, { useEffect, useState } from "react";
import Axios from "axios";
import { API_URL } from "../../constants/API";
import { Button, Modal, Col } from "react-bootstrap";

const UserTransactions = () => {
  const [transList, setTransList] = useState([]);
  const [filterTransList, setFilterTransList] = useState([]);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(0);
  const [itemPerPage, setItemPerPage] = useState(7);
  const [show, setShow] = useState(false);
  const [searchCostumer, setSearchCostumer] = useState("");
  const [searchStatus, setSearchStatus] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [detailTrans, setDetailTrans] = useState([]);
  const [uploadImg, setUploadImg] = useState({
    nameImg: "",
    previewImg:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/1024px-User-avatar.svg.png",
  });
  const handleClose = () => setShow(false);
  const handleShow = (idorder) => {
    fetchTransaction(idorder);
    setShow(true);
  };

  const fetchTransaction = (idorder) => {
    Axios.get(API_URL + "/transaction/detail-transaction/" + idorder)
      .then((res) => {
        console.log(res.data);
        setDetailTrans(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const imageHandler = (e) => {
    if (e.target.files[0]) {
      setUploadImg({
        ...uploadImg,
        nameImg: e.target.files[0].name,
        previewImg: URL.createObjectURL(e.target.files[0]),
        addFile: e.target.files[0],
      });
      console.log(uploadImg.nameImg);
    }
  };
  const fetchProduct = () => {
    Axios.get(API_URL + "/transaction/get-transaction")
      .then((res) => {
        setTransList(res.data);
        setFilterTransList(res.data);
        setMaxPage(Math.ceil(res.data.length / itemPerPage));
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

  const renderProduct = () => {
    const beginningIndex = (page - 1) * itemPerPage;
    let rawData = [...filterTransList];

    const compareDate = (a, b) => {
      if (a.order_date < b.order_date) {
        return -1;
      }
      // agar tukar posisi
      if (a.order_date > b.order_date) {
        return 1;
      }
      return 0;
    };

    switch (sortBy) {
      case "lowPrice":
        // a,b merupakan product di database
        rawData.sort((a, b) => a.order_price - b.order_price);
        break;

      case "highPrice":
        rawData.sort((a, b) => b.order_price - a.order_price);
        break;

      case "Old Transaction":
        rawData.sort(compareDate);
        break;

      case "New Transaction":
        rawData.sort((a, b) => compareDate(b, a));
        break;

      case "Old Transaction":
        rawData.sort(compareDate);
        break;

      default:
        rawData = [...filterTransList];
        break;
    }

    const currentData = rawData.slice(
      beginningIndex,
      beginningIndex + itemPerPage
    );

    return currentData.map((val) => {
      const date = val.order_date.slice(0, 10).split("-").reverse().join("/");
      const price = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "IDR",
      }).format(val.order_price);

      return (
        <tr>
          <th scope="row">{val.idorder}</th>
          <td>{val.full_name}</td>
          <td>{val.address.slice(0, 30)}</td>
          <td>{date}</td>
          <td>{val.total_item}</td>
          <td>
            {val.order_status === "Menunggu Pengiriman" ? (
              <span className="badge badge-soft-primary">
                {val.order_status}
              </span>
            ) : val.order_status === "Validasi Resep" ? (
              <span className="badge badge-soft-warning">
                {val.order_status}
              </span>
            ) : val.order_status === "Order Selesai" ? (
              <span className="badge badge-soft-success">
                {val.order_status}
              </span>
            ) : (
              <span className="badge badge-soft-danger">
                {val.order_status}
              </span>
            )}
          </td>
          <td>{price}</td>
          <td>
            <button
              className="btn btn-primary btn-sm"
              onClick={() => handleShow(val.idorder)}
            >
              Lihat Detail
            </button>
          </td>
        </tr>
      );
    });
  };

  const RenderDetailProduct = () => {
    if (detailTrans.length > 0) {
      console.log(detailTrans);
      let date = detailTrans[0].order_date
        .slice(0, 10)
        .split("-")
        .reverse()
        .join("/");
      let totalPrice = 0;
      let totalRecipe = 0;
      for (let i = 0; i < detailTrans.length; i++) {
        totalPrice += detailTrans[i].price_stock * detailTrans[i].quantity;
      }

      for (let i = 0; i < detailTrans.length; i++) {
        totalRecipe += detailTrans[i].price_unit;
      }
      return (
        <Modal show={show} onHide={handleClose} centered>
          <Modal.Header closeButton></Modal.Header>

          <Modal.Body>
            <Col xs={12}>
              <h5 className="text-success text-center">
                <strong>STATUS PRODUK</strong>
              </h5>
              <hr />
              <h6>Status:</h6>
              <span>
                {detailTrans[0].order_status === "Menunggu Pengiriman" ? (
                  <span className="badge badge-soft-primary">
                    {detailTrans[0].order_status}
                  </span>
                ) : detailTrans[0].order_status === "Validasi Resep" ? (
                  <span className="badge badge-soft-warning">
                    {detailTrans[0].order_status}
                  </span>
                ) : detailTrans[0].order_status === "Order Selesai" ? (
                  <span className="badge badge-soft-success">
                    {detailTrans[0].order_status}
                  </span>
                ) : (
                  <span className="badge badge-soft-danger">
                    {detailTrans[0].order_status}
                  </span>
                )}
              </span>
              <h6>Nama Costumer:</h6>
              <span>{detailTrans[0].full_name}</span>
              <h6>Tanggal Transaksi:</h6>
              <span>{date}</span>
              <h6>Nomor Pengiriman:</h6>
              <span>{detailTrans[0].idshipping}</span>
              <h6>Alamat Pengiriman:</h6>
              <span>{detailTrans[0].address}</span>
            </Col>
            {detailTrans[0].recipe_image === null ? (
              <Col xs={12}>
                <br />
                <h5 className="text-success text-center">
                  <strong>DETAIL PRODUK</strong>
                </h5>
                <hr />
                <h6>Nama Produk:</h6>
                {detailTrans.map((item, i) => (
                  <div key={i}>
                    {item.product_name} x {item.quantity} : Rp
                    {item.price_stock * item.quantity}
                  </div>
                ))}

                <div>Ongkir: Rp.{detailTrans[0].order_price - totalPrice}</div>
                <div>
                  <strong>Total Harga: Rp.{detailTrans[0].order_price}</strong>
                </div>
                <br />
              </Col>
            ) : (
              <Col xs={12}>
                <br />
                <h5 className="text-success text-center">
                  <strong>DETAIL PRODUK</strong>
                </h5>
                <hr />
                <h6>Nama Produk:</h6>
                {detailTrans.map((item, i) => (
                  <div key={i}>
                    {item.product_name} : Rp
                    {item.price_unit}
                  </div>
                ))}

                <div>Ongkir: Rp.{detailTrans[0].order_price - totalRecipe}</div>
                <div>
                  <strong>Total Harga: Rp.{detailTrans[0].order_price}</strong>
                </div>
                <br />
              </Col>
            )}

            <Col xs={12}>
              <h5 className="text-success text-center">
                <strong>BUKTI PEMBAYARAN</strong>
              </h5>
              <hr />
              <div className="d-flex flex-column justify-content-center">
                <img
                  className="img-fluid rounded z-depth-2 "
                  src={API_URL + detailTrans[0].payment_image}
                  alt="Bukti Pembayaran"
                />
              </div>
            </Col>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      );
    }
    return null;
  };

  const searchCostumerHandler = (event) => {
    const value = event.target.value;
    setSearchCostumer(value);
  };
  const searchStatusHandler = (event) => {
    const value = event.target.value;
    setSearchStatus(value);
  };

  const sortByInputHandler = (event) => {
    const value = event.target.value;

    setSortBy(value);
  };

  const searchBtnHandler = () => {
    const filterTransList = transList.filter((val) => {
      return (
        val.full_name.toLowerCase().includes(searchCostumer.toLowerCase()) &&
        val.order_status.toLowerCase().includes(searchStatus.toLowerCase())
      );
    });

    setFilterTransList(filterTransList);
    setMaxPage(Math.ceil(filterTransList.length / itemPerPage));
    setPage(page);
  };

  useEffect(() => {
    fetchProduct();
  }, []);
  return (
    <div className="content-page">
      <div className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-body">
                  <div className="sub-header">
                    <div className="row g-3">
                      <div className="col-md-3">
                        <h4 className="header-title mt-0 mb-1">
                          User Transactions
                        </h4>
                        <p>
                          Menampilkan Seluruh transaksi Users di Purwadhicare
                        </p>
                      </div>
                      <div className="col-md-2">
                        <label htmlFor="sortBy">Sort By</label>
                        <select
                          onChange={sortByInputHandler}
                          name="sortBy"
                          className="form-control"
                        >
                          <option value="default">Default</option>
                          <option value="lowPrice">Lowest Price</option>
                          <option value="highPrice">Highest Price</option>
                          <option value="Old Transaction">
                            Old Transaction
                          </option>
                          <option value="New Transaction">
                            New Transaction
                          </option>
                        </select>
                      </div>
                      <div className="col-md-2">
                        <label htmlFor="searchCostumerName">
                          Costumer Name
                        </label>
                        <input
                          onChange={searchCostumerHandler}
                          name="searchCostumerName"
                          type="text"
                          className="form-control mb-3"
                        />
                      </div>
                      <div className="col-md-3">
                        <label htmlFor="searchStatus">Product Status</label>
                        <select
                          onChange={searchStatusHandler}
                          name="searchStatus"
                          className="form-control"
                          type="text"
                        >
                          <option value="">All Status</option>
                          <option defaultValue="Menunggu Pembayaran">
                            Menunggu Pembayaran
                          </option>
                          <option defaultValue="Validasi Resep">
                            Validasi Resep
                          </option>
                          <option defaultValue="Menunggu Pengiriman">
                            Menunggu Pengiriman
                          </option>
                          <option defaultValue="Order Selesai">
                            Order Selesai
                          </option>
                          <option defaultValue="Transaksi Dibatalkan">
                            Transaksi Dibatalkan
                          </option>
                        </select>
                      </div>
                      <div className="col-md-2">
                        <button
                          onClick={searchBtnHandler}
                          className="btn btn-block btn-info rounded-pill justify-content-center mt-4"
                        >
                          Search
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="table-responsive">
                    <table className="table m-0">
                      <thead>
                        <tr className="text-center">
                          <th>Id Order</th>
                          <th>Costumers</th>
                          <th>Alamat</th>
                          <th>Tanggal Order</th>
                          <th>Jumlah Obat</th>
                          <th>Status</th>
                          <th>Total Harga</th>
                          <th>Aksi</th>
                        </tr>
                      </thead>
                      <tbody>{renderProduct()}</tbody>
                      {RenderDetailProduct()}
                    </table>
                    <ul className="pagination pagination-rounded">
                      <li
                        className="paginate_button page-item previous"
                        id="basic-datatable_previous"
                      >
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
                      <li
                        className="paginate_button page-item next"
                        id="basic-datatable_next"
                      >
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

export default UserTransactions;
