/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Axios from "axios";
import { API_URL } from "../../constants/API";
import { Button, Modal, Form } from "react-bootstrap";

const ProductInventory = () => {
  const [filterProductList, setFilterProductList] = useState([]);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(0);
  const [itemPerPage, setItemPerPage] = useState(7);
  const [show, setShow] = useState(false);
  
  const [editProductList, setEditProductList] = useState({
    idproduct: 0,
    total_netto: 0,
    stock_bottle: 0,
    netto: 0,
  });
  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = () => {
    Axios.get(API_URL + "/product/inventory")
      .then((res) => {
        console.log(res.data[0]);
        setFilterProductList(res.data[0]);
        setMaxPage(Math.ceil(res.data[0].length / itemPerPage));
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

  const editToggle = (editData) => {
    setEditProductList({
      idproduct: editData.idproduct,
      total_netto: editData.total_netto,
      stock_bottle: editData.stock_bottle,
      netto: editData.netto,
    });
    handleShow();
    console.log(editProductList);
  };

  const cancelEdit = () => {
    setEditProductList({
      ...editProductList,
      idproduct: 0,
    });
    handleClose();
  };

  // const bottleToTotalNetto = (idproduct) => {
  //   editProductList.jumlah_botol*editProductList.netto
  // };

  const saveStockBtnHandler = () => {
    Axios.patch(
      `http://localhost:2200/product/edit-product/${editProductList.idproduct}`,
      {
        //  huruf kalimat terakhir harus sama dengan input handler di bawah
        total_netto: editProductList.stock_bottle * editProductList.netto,
      }
    )
      .then(() => {
        alert(`Berhasil update stok`);
        handleClose();
        fetchProduct();
      })
      .catch(() => {
        alert("Terjadi kesalahan server");
      });
  };

  const inputHandlerEdit = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    console.log(name, value);
    // const { name, value } = event.target;
    setEditProductList({ ...editProductList, [name]: value });
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
        <tr key={val.row_number}>
          <th scope="row">{val.row_number}</th>
          <td>{val.product_name}</td>
          <td>{val.stock_bottle} Botol</td>
          <td>{val.netto > 0 ? `${val.netto} ${val.unit}` : "Stok Kosong"}</td>
          <td>
            {val.total_netto > 0
              ? `${val.total_netto} ${val.unit}`
              : "Stok Kosong"}
          </td>

          <td>{`${val.sisa_netto} ${val.unit}`}</td>
          <td>
            {val.stock_bottle > 4 ? (
              <span className="badge badge-soft-primary">Stok Tersedia</span>
            ) : val.stock_bottle <= 0 ? (
              <span className="badge badge-soft-danger">Stok Kosong</span>
            ) : (
              <span className="badge badge-soft-warning">Stok Menipis</span>
            )}
          </td>
          <td>
            <button
              className="btn btn-primary btn-sm"
              onClick={() => editToggle(val)}
            >
              Edit Stok
            </button>
          </td>
        </tr>
      );
    });
  };

  const renderEditStock = () => {
    return (
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Stock Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">

              <Form.Label>Edit Jumlah Botol</Form.Label>
              <Form.Control
                onChange={inputHandlerEdit}
                type="text"
                name="stock_bottle"
              />

            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cancelEdit}>
            Close
          </Button>
          <Button onClick={saveStockBtnHandler} variant="primary">
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  return (
    <div className="content-page">
      <div className="content">
        <div className="container-fluid">
          {renderEditStock()}
          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-body">
                  <h4 className="header-title mt-0 mb-1">
                    Admin Product Inventory
                  </h4>
                  <p className="sub-header">
                    Menampilkan secara detail daftar jumlah produk yang tersedia
                    di gudang saat ini.
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
                          <th>Sisa Netto</th>
                          <th>Status</th>
                          <th>Aksi</th>
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

export default ProductInventory;
