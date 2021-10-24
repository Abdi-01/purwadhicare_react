import React, { useEffect, useState } from "react";
import Axios from "axios";
import "../../assets/styles/admin.css";
import { FiPlus } from "react-icons/fi";
import { Button, Modal, Form } from "react-bootstrap";

function Admin() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [productList, setProductList] = useState([]);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(0);
  const [itemPerPage] = useState(5);

  const [addProductList, setAddProductList] = useState({
    category: "",
    productName: "",
    description: "",
    unit: "",
    priceUnit: 0,
    priceStock: 0,
    image: "",
  });
  const [editProductList, setEditProductList] = useState({
    idproduct: 0,
    category: "",
    productName: "",
    description: "",
    unit: "",
    priceUnit: 0,
    priceStock: 0,
    image: "",
  });

  console.log("perpage", editProductList.itemPerPage);
  const fetchProducts = () => {
    // yang mau dipanggil
    Axios.get("http://localhost:2200/product/get")
      .then((result) => {
        console.log(result.data.length);
        setProductList(result.data);
        setMaxPage(Math.ceil(result.data.length / itemPerPage));
      })
      .catch(() => {
        alert("Terjadi kesalahan server");
      });
  };

  const editToggle = (editData) => {
    setEditProductList({
      idproduct: editData.idproduct,
      category: editData.category,
      productName: editData.product_name,
      description: editData.description,
      unit: editData.unit,
      priceUnit: editData.price_unit,
      priceStock: editData.price_stock,
      image: editData.image,
    });
  };

  const saveBtnHandler = () => {
    Axios.patch(
      `http://localhost:2200/product/edit-product/${editProductList.idproduct}`,
      {
        //  huruf kalimat terakhir harus sama dengan input handler di bawah
        category: editProductList.category,
        product_name: editProductList.productName,
        description: editProductList.description,
        unit: editProductList.unit,
        price_unit: editProductList.priceUnit,
        price_stock: editProductList.priceStock,
        image: editProductList.image,
      }
    )
      .then(() => {
        fetchProducts();
        cancelEdit();
      })
      .catch(() => {
        alert("Terjadi kesalahan server");
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

  const cancelEdit = () => {
    setEditProductList({
      ...editProductList,
      idproduct: 0,
    });
  };

  const deleteBtnHandler = (deleteId) => {
    const confirmDelete = window.confirm("Sure want to delete?");
    if (confirmDelete) {
      Axios.delete(`http://localhost:2200/product/delete-product/${deleteId}`)
        .then(() => {
          fetchProducts();
        })
        .catch(() => {
          alert("Server Error");
        });
    } else {
      alert("Delete cancelled");
    }
  };

  const renderProducts = () => {
    const beginningIndex = (page - 1) * itemPerPage;
    const currentData = productList.slice(
      beginningIndex,
      beginningIndex + itemPerPage
    );
    return currentData.map((val) => {
      if (val.idproduct === editProductList.idproduct) {
        return (
          <tr>
            <td>{val.idproduct}</td>
            <td>
              <input
                defaultValue={editProductList.category}
                onChange={inputHandlerEdit}
                type="text"
                className="form-control"
                name="category"
              />
            </td>
            <td>
              <input
                defaultValue={editProductList.productName}
                onChange={inputHandlerEdit}
                type="text"
                className="form-control"
                name="productName"
              />
            </td>
            <td>
              <input
                defaultValue={editProductList.description}
                onChange={inputHandlerEdit}
                type="text"
                className="form-control"
                name="description"
              />
            </td>
            <td>
              <select
                defaultValue={editProductList.unit}
                onChange={inputHandlerEdit}
                type="text"
                className="form-control"
                name="unit"
              >
                <option defaultValue="ml">ml</option>
                <option defaultValue="mg">mg</option>
              </select>
            </td>
            <td>
              <input
                defaultValue={editProductList.priceUnit}
                onChange={inputHandlerEdit}
                type="number"
                className="form-control"
                name="priceUnit"
              />
            </td>
            <td>
              <input
                defaultValue={editProductList.priceStock}
                onChange={inputHandlerEdit}
                type="number"
                className="form-control"
                name="priceStock"
              />
            </td>
            <td>
              <input
                defaultValue={editProductList.image}
                onChange={inputHandlerEdit}
                type="text"
                className="form-control"
                name="image"
              />
            </td>
            <td>
              <button onClick={saveBtnHandler} className="btn btn-success">
                Save
              </button>
            </td>
            <td>
              <button onClick={cancelEdit} className="btn btn-light">
                Cancel
              </button>
            </td>
          </tr>
        );
      }
      return (
        <tr>
          <td>{val.idproduct}</td>
          <td>{val.category}</td>
          <td>{val.product_name}</td>
          <td>{val.description}</td>
          <td>{val.unit}</td>
          <td>{val.price_unit}</td>
          <td>{val.price_stock}</td>
          <td>
            <img className="admin-product-image" src={val.image} alt="" />
          </td>
          <td>
            <button onClick={() => editToggle(val)} className="btn btn-info">
              Edit
            </button>
          </td>
          <td>
            <button
              onClick={() => deleteBtnHandler(val.idproduct)}
              className="btn btn-dark"
            >
              Delete
            </button>
          </td>
        </tr>
      );
    });
  };

  const addNewProduct = () => {
    Axios.post("http://localhost:2200/product/add-product", {
      category: addProductList.category,
      product_name: addProductList.productName,
      description: addProductList.description,
      unit: addProductList.unit,
      price_unit: addProductList.priceUnit,
      price_stock: addProductList.priceStock,
      image: addProductList.image,
    })
      .then(() => {
        // utk refresh
        fetchProducts();
        // agar kembali ke form sebelum di edit
        handleClose();
      })
      .catch(() => {
        alert("Terjadi kesalahan server");
      });
  };

  const inputHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    console.log(name, value);
    // const { name, value } = event.target;
    setAddProductList({ ...addProductList, [name]: value });
  };

  const inputHandlerEdit = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    console.log(name, value);
    // const { name, value } = event.target;
    setEditProductList({ ...editProductList, [name]: value });
  };

  const renderAddProduct = () => {
    return (
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Tambah Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                onChange={inputHandler}
                name="category"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                onChange={inputHandler}
                name="productName"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                onChange={inputHandler}
                name="description"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Unit</Form.Label>
              <select
                className="form-control"
                onChange={inputHandler}
                name="unit"
              >
                <option disabled>Open this select menu</option>
                <option defaultValue="ml">ml</option>
                <option defaultValue="mg">mg</option>
              </select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Price Unit</Form.Label>
              <Form.Control
                type="number"
                onChange={inputHandler}
                name="priceUnit"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Price Stock</Form.Label>
              <Form.Control
                type="number"
                onChange={inputHandler}
                name="priceStock"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Image</Form.Label>
              <Form.Control type="text" onChange={inputHandler} name="image" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={addNewProduct}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  // seperti component did mount
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="content-page">
      <div className="content">
        <div className="container-fluid ">
          {renderAddProduct()}
          <div className="p-0">
            <div
              id="carouselExampleSlidesOnly"
              className="carousel slide mb-2 mt-0"
              data-ride="carousel"
            >
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img
                    className="d-block w-full"
                    src="https://png.pngtree.com/back_origin_pic/05/06/19/4664ceb6584b736cc2e7317820712934.jpg"
                    alt="First slide"
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12 text-center p-5 mb-6">
                <div className="d-flex flex-row justify-content-between mb-4 align-items-center">
                  <h2 className="text-muted">Manage Products</h2>
                  <button
                    className="btn btn-primary text-center"
                    onClick={handleShow}
                  >
                    Add Product <FiPlus />
                  </button>
                </div>
                <table className="table table-light mt-8">
                  <thead className="thead-light">
                    <tr>
                      <th>No.</th>
                      <th>Category</th>
                      <th>Product Name</th>
                      <th>Description</th>
                      <th>Unit (ml/mg)</th>
                      <th>Unit Price (IDR)</th>
                      <th>Stock Item Price (IDR)</th>
                      <th>Product Image</th>
                      <th colSpan="2">Action</th>
                    </tr>
                  </thead>
                  <tbody>{renderProducts()}</tbody>
                </table>
                <div className="mt-3">
                  <div className="d-flex flex-row justify-content-between align-items-center">
                    <button
                      // disabled={paginate.page === 1}
                      onClick={prevPageHandler}
                      className="btn btn-info"
                    >
                      {"<"}
                    </button>
                    <div className="text-center">
                      Page {page} of {maxPage}
                    </div>
                    <button
                      // disabled={paginate.page >= paginate.maxPage}
                      onClick={nextPageHandler}
                      className="btn btn-info"
                    >
                      {">"}
                    </button>
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

export default Admin;
