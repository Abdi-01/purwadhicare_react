import React, { useEffect, useState } from "react";
import Axios from "axios";
// agar yang bukan admin bisa redirect ke page bukan admin
import { Redirect } from "react-router-dom";
// connect dipakai agar orang yang bukan role admin ga bisa akses admin
import { connect } from "react-redux";
import "../assets/styles/admin.css";

function Admin() {
  const [productList, setProductList] = useState([]);

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

  const fetchProducts = () => {
    // yang mau dipanggil
    Axios.get("http://localhost:2200/product/get")
      .then((result) => {
        setProductList(result.data);
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
    return productList.map((val) => {
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

  // seperti component did mount
  useEffect(() => {
    fetchProducts();
  }, []);

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
        cancelEdit();
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

  return (
    <div className="p-0">
      <div
        id="carouselExampleSlidesOnly"
        class="carousel slide"
        data-ride="carousel"
        className="mb-2 mt-0"
      >
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img
              class="d-block w-full"
              src="https://png.pngtree.com/back_origin_pic/05/06/19/4664ceb6584b736cc2e7317820712934.jpg"
              alt="First slide"
            />
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-12 text-center p-5 mb-6">
          <h2 className="text-muted m-6 ">Manage Products</h2>
          <table className="table table-light mt-8">
            <thead className="thead-light">
              <tr>
                <th>ID </th>
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

            <tfoot>
              <tr>
                <td></td>
                <td>
                  <input
                    value={addProductList.category}
                    onChange={inputHandler}
                    name="category"
                    type="text"
                    className="form-control"
                    placeholder="Category"
                  />
                </td>
                <td>
                  <input
                    value={addProductList.productName}
                    onChange={inputHandler}
                    name="productName"
                    type="text"
                    className="form-control"
                    placeholder="Product Name"
                  />
                </td>
                <td>
                  <input
                    value={addProductList.description}
                    onChange={inputHandler}
                    name="description"
                    type="text"
                    className="form-control"
                    placeholder="Description"
                  />
                </td>

                <td>
                  <select
                    defaultValue={addProductList.unit}
                    onChange={inputHandler}
                    name="unit"
                    type="text"
                    className="form-control"
                    id=""
                  >
                    <option defaultValue="ml">ml</option>
                    <option defaultValue="mg">mg</option>
                  </select>
                </td>

                <td>
                  <input
                    defaultValue={addProductList.priceUnit}
                    onChange={inputHandler}
                    name="priceUnit"
                    type="number"
                    className="form-control"
                    placeholder="Unit Price"
                  />
                </td>
                <td>
                  <input
                    defaultValue={addProductList.priceStock}
                    onChange={inputHandler}
                    name="priceStock"
                    type="number"
                    className="form-control"
                    placeholder="Item Price"
                  />
                </td>
                <td>
                  <input
                    onChange={inputHandler}
                    defaultValue={addProductList.image}
                    className="form-control"
                    type="text"
                    name="image"
                    placeholder="Image"
                  />
                </td>

                <td colSpan="2">
                  <button onClick={addNewProduct} className="btn btn-success">
                    Add Product
                  </button>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Admin;
