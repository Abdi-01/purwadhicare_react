import React, { useEffect, useState } from "react";
import Axios from "axios";
import { API_URL } from "../../constants/API";
import { Button, Modal, Form, ModalDialog } from "react-bootstrap";

const UserTransactions = () => {
  const [filterProductList, setFilterProductList] = useState([]);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(0);
  const [itemPerPage, setItemPerPage] = useState(7);
  const [show, setShow] = useState(false);
  const [detailOrder, setDetailOrder] = useState([]);
  const [editProductList, setEditProductList] = useState({
    idorder: 0,
    idproduct: 0,
    quantity: 0,
  });
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    fetchProduct();
    fetchDetailTransaction();
  }, []);

  const fetchProduct = () => {
    Axios.get(API_URL + "/transaction/get-transaction")
      .then((res) => {
        setFilterProductList(res.data);
        setMaxPage(Math.ceil(res.data.length / itemPerPage));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchDetailTransaction = () => {
    Axios.get(`http://localhost:2200/transaction/get-detail`)
      .then((result) => {
        console.log(result.data);
        setDetailOrder(result.data);
      })
      .catch((err) => {
        alert("Terjadi kesalahan di server transaction");
        console.log(err);
      });
  };

  const cancelQuantity = (cancelqty, idproduct) => {
    Axios.patch(
      `http://localhost:2200/transaction/cancel-quantity?cancelqty=${cancelqty}&idproduct=${idproduct}`
    )
      .then(() => alert("stok berhasil dikembalikan"))
      .catch(() => {
        alert("Stok belum terupdate");
      });
  };

  const rejectTransactionBtnHandler = (idorder) => {
    Axios.patch(
      `http://localhost:2200/transaction/reject-transaction/${idorder}`
    )
      .then(() => {
        fetchProduct();
        fetchDetailTransaction();
        editToggle();
        cancelQuantity();
      })
      .catch(() => {
        alert("Transaksi belum dibatalkan");
      });
  };

  const confirmTransactionBtnHandler = (idorder) => {
    Axios.patch(
      `http://localhost:2200/transaction/confirm-transaction/${idorder}`
    )
      .then(() => {
        fetchDetailTransaction();
        fetchProduct();
        alert("Transaksi berhasil");
      })
      .catch(() => {
        alert("Transaksi belum dikonfirmasi");
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

  const editToggle = (editData) => {
    setEditProductList({
      idproduct: editData.idproduct,
      idorder: editData.total_netto,
      quantity: editData.stock_bottle,
    });

    console.log(editProductList);
  };

  const renderProduct = () => {
    const beginningIndex = (page - 1) * itemPerPage;
    let rawData = [...filterProductList];
    const currentData = rawData.slice(
      beginningIndex,
      beginningIndex + itemPerPage
    );

    return currentData.map((val) => {
      return (
        <tr>
          <th scope="row">{val.idorder}</th>
          <td>{val.full_name}</td>
          <td>{val.address}</td>
          <td>{val.total_item}</td>
          <td>
            {val.order_status === "Menunggu Pengiriman" ? (
              <span className="badge badge-soft-primary">
                {val.order_status}
              </span>
            ) : val.order_status === "Validasi Resep" ? (
              <span className="badge badge-soft-danger">
                {val.order_status}
              </span>
            ) : (
              <span className="badge badge-soft-warning">
                {val.order_status}
              </span>
            )}
          </td>
          <td>{val.order_price}</td>
          <td>
            <button className="btn btn-primary btn-sm" onClick={handleShow}>
              Lihat Detail
            </button>
            {/* {renderDetailProduct(val)} */}
          </td>
          <td>
            <button
              onClick={() => confirmTransactionBtnHandler(val.idorder)}
              className="btn btn-light btn-sm mr-1"
            >
              Confirm
            </button>
            <button
              onClick={() => rejectTransactionBtnHandler(val.idorder)}
              className="btn btn-dark btn-sm ml-1"
            >
              Reject
            </button>
          </td>
        </tr>
      );
    });
  };

  //   const renderDetailProduct = (val) => {
  //     const date = val.order_date.slice(0, 10).split("-").reverse().join("/");

  //     return (
  //       <Modal show={show} onHide={handleClose} centered>
  //         <Modal.Header closeButton>
  //           <Modal.Title>Detail Transaksi</Modal.Title>
  //         </Modal.Header>
  //         <Modal.Body>
  //           <h6>Status:</h6>
  //           <span>{val.order_status}</span>
  //           <h6>Tanggal Transaksi:</h6>
  //           <span>{date}</span>
  //         </Modal.Body>
  //         <Modal.Footer>
  //           <Button variant="secondary" onClick={handleClose}>
  //             Close
  //           </Button>
  //         </Modal.Footer>
  //       </Modal>
  //     );
  //   };

  return (
    <div className="content-page">
      <div className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-body">
                  <h4 className="header-title mt-0 mb-1">User Transactions</h4>
                  <p className="sub-header">
                    Menampilkan seluruh transaksi users beserta statusnya
                  </p>
                  <div className="table-responsive">
                    <table className="table m-0">
                      <thead>
                        <tr>
                          <th>Id Order</th>
                          <th>Costumers</th>
                          <th>Alamat</th>
                          <th>Jumlah Obat</th>
                          <th>Status</th>
                          <th>Total Harga</th>
                          <th>Detail</th>
                          <th colSpan="2">Action</th>
                        </tr>
                      </thead>
                      <tbody>{renderProduct()}</tbody>
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
