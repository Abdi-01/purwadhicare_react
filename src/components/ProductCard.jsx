import React from "react";
import "../assets/styles/product_card.css";
import { Link } from "react-router-dom";
import Axios from "axios";

function ProductCard(props) {
  return (
    <div className="card product-card">
      <img src={props.productData.image} alt="" />

      <div className="mt-2">
        <div>
          <Link to={`productdetail/${props.productData.idproduct}`}>
            {" "}
            <h6>{props.productData.product_name}</h6>
          </Link>

          <span className="text-muted">
            Rp. {props.productData.price_stock.toLocaleString()}
          </span>
        </div>
        {/* <button className="btn btn-outline-info rounded-pill mt-2">Add To Cart</button> */}
        <div className="d-flex flex-row justify-content-end">
          <button className="btn btn-outline-info rounded-pill mt-2">
            <Link to={`productdetail/${props.productData.idproduct}`}>
              See details
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
