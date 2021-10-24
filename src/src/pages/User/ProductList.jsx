import React from "react";
import ProductCard from "../../components/ProductCard";
// utk global state instal redux, redux-thunk, react-redux

function Home() {
  return (
    <div className="mt-5 m-4">
      <div className="d-flex flex-row justify-content-center m-4">
        <h2>Products List</h2>
      </div>

      <div className="row">
        <div className="col-3">
          <div className="card">
            <div className="card-header">
              <strong>Filter Products</strong>
            </div>
            <div className="card-body">
              <label htmlFor="searchProductName">Product Name</label>
              <input name="searchProductName" type="text" className="form-control mb-3" />
              <label htmlFor="searchCategory">Product Category</label>
              <select name="searchCategory" className="form-control">
                <option value="">All Item</option>
                <option value="">Obat Tablet</option>
                <option value="">Obat Sirup</option>
                <option value="">Obat Racik</option>
              </select>
            </div>
          </div>
          <div className="card mt-4">
            <div className="card-header">
              <strong>Sort Products</strong>
            </div>
            <div className="card-body">
              <label htmlFor="searchCategory">Sort By</label>
              <select name="searchCategory" className="form-control">
                <option value="">Default</option>
                <option value="">Lowest Price</option>
                <option value="">Highest Price</option>
                <option value="">A-Z</option>
                <option value="">Z-A</option>
              </select>
            </div>
          </div>
          <div className="mt-3">
            <div className="d-flex flex-row justify-content-between align-items-center">
              <button className="btn rounded-circle btn-info">{"<"}</button>
              <div className="text-center">Page 1 of 7</div>
              <button className="btn rounded-circle btn-info">{">"}</button>
            </div>
          </div>
        </div>
        <div className="col-9">
          <div className="d-flex flex-wrap flex-row">
            <ProductCard />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
