import React, { useState, useEffect } from "react";
import ProductCard from "../../components/ProductCard";
// utk global state instal redux, redux-thunk, react-redux
import Axios from "axios";
import { Link } from "react-router-dom";

function ProductList() {
  const [productList, setProductList] = useState([]);
  const [filterProductList, setFilterProductList] = useState([]);

  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(0);
  const [itemPerPage, setItemPerPage] = useState(8);

  const [searchProductName, setSearchProductName] = useState("");
  console.log(searchProductName);
  const [searchCategory, setSearchCategory] = useState("");

  const [sortBy, setSortBy] = useState("");

  const fetchProducts = () => {
    // yang mau dipanggil
    Axios.get("http://localhost:2200/product/get")
      .then((result) => {
        setProductList(result.data);
        setFilterProductList(result.data);
        setMaxPage(Math.ceil(result.data.length / itemPerPage)); //pagination
      })
      .catch(() => {
        alert("Terjadi kesalahan server");
      });
  };

  const renderProducts = () => {
    const beginningIndex = (page - 1) * itemPerPage;

    //kloning dari filterProductList agar bisa dimanipulasi langsung
    let rawData = [...filterProductList];

    // untuk fungsi sort by alphabethical (az, za)
    const compareString = (a, b) => {
      if (a.product_name < b.product_name) {
        return -1;
      }
      // agar tukar posisi
      if (a.product_name > b.product_name) {
        return 1;
      }
      return 0;
    };

    switch (sortBy) {
      case "lowPrice":
        // a,b merupakan product di database
        rawData.sort((a, b) => a.price_stock - b.price_stock);
        break;

      case "highPrice":
        rawData.sort((a, b) => b.price_stock - a.price_stock);
        break;

      case "az":
        rawData.sort(compareString);
        break;

      case "za":
        rawData.sort((a, b) => compareString(b, a));
        break;

      default:
        rawData = [...filterProductList];
        break;
    }

    const currentData = rawData.slice(
      beginningIndex,
      beginningIndex + itemPerPage
    );

    // karena current data memiliki data yang sudah dipisah per page
    return currentData.map((val) => {
      return <ProductCard productData={val} />;
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

  const searchProductInputHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    // karena tipe data string jadi gaperlu ...searchProductName
    setSearchProductName(value);
  };

  const searchCategoryInputHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setSearchCategory(value);
  };

  const sortByInputHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setSortBy(value);
  };

  const searchBtnHandler = () => {
    const filterProductList = productList.filter((val) => {
      return (
        val.product_name
          .toLowerCase()
          .includes(searchProductName.toLowerCase()) &&
        val.category.toLowerCase().includes(searchCategory.toLowerCase())
      );
    });

    setFilterProductList(filterProductList);
    setMaxPage(Math.ceil(filterProductList.length / itemPerPage));
    setPage(page);
  };

  // seperti component did mount
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className=" m-6">
      <div className="d-flex flex-row justify-content-center m-4">
        <h2>Products List</h2>
      </div>

      <div className="row m-3">
        <div className="col-3">
          <div className="card">
            <div className="card-header">
              <strong>Filter Products</strong>
            </div>
            <div className="card-body">
              <label htmlFor="searchProductName">Product Name</label>
              <input
                onChange={searchProductInputHandler}
                name="searchProductName"
                type="text"
                className="form-control mb-3"
              />
              <label htmlFor="searchCategory">Product Category</label>
              <select
                onChange={searchCategoryInputHandler}
                name="searchCategory"
                className="form-control"
                type="text"
              >
                <option value="">All Item</option>
                <option defaultValue="Sakit Kepala">Sakit Kepala</option>
                <option defaultValue="Demam">Demam</option>
                <option defaultValue="Batuk">Batuk</option>
                <option defaultValue="Vitamin">Vitamin</option>
              </select>
              <button
                onClick={searchBtnHandler}
                className="btn btn-block btn-info rounded-pill justify-content-center mt-4"
              >
                Search
              </button>
            </div>
          </div>
          <div className="card mt-4">
            <div className="card-header">
              <strong>Sort Products</strong>
            </div>
            <div className="card-body">
              <label htmlFor="sortBy">Sort By</label>
              <select
                onChange={sortByInputHandler}
                name="sortBy"
                className="form-control"
              >
                <option value="default">Default</option>
                <option value="lowPrice">Lowest Price</option>
                <option value="highPrice">Highest Price</option>
                <option value="az">A-Z</option>
                <option value="za">Z-A</option>
              </select>
            </div>
          </div>
          <div className="mt-3">
            <div className="d-flex flex-row justify-content-between align-items-center">
              <button
                disabled={page === 1}
                className="btn rounded-circle btn-info"
                onClick={prevPageHandler}
              >
                {"<"}
              </button>
              <div className="text-center">
                Page {page} of {maxPage}{" "}
              </div>
              <button
                disabled={page === maxPage}
                className="btn rounded-circle btn-info"
                onClick={nextPageHandler}
              >
                {">"}
              </button>
            </div>
          </div>
          <div className="card mt-4" style={{ width: "23rem" }}>
            <div className="card-body">
              <h5 className="card-title">Ajukan Resep Obat</h5>
              <p className="card-text">
                Jika anda memiliki obat resep dari dokter, silahkan mengajukan
                resep dengan menekan tombol dibawah ini.
              </p>
              <Link to="/recipe">
                <button className="btn btn-info btn-block">Upload Resep</button>
              </Link>
            </div>
          </div>
        </div>
        <div className="col-9">
          <div className="d-flex flex-wrap flex-row">
            {/* <ProductCard /> */}
            {/* render your product here */}
            {renderProducts()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductList;
