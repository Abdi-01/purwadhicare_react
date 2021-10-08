import React from "react";
import "../assets/styles/product_card.css";

function ProductCard() {
  return (
    <div className="card product-card">
      <img
        src="https://images.tokopedia.net/img/cache/700/product-1/2019/3/10/22418439/22418439_5f9f971d-04d1-45d0-b4d4-e08d50d295e8_540_540.jpg"
        alt=""
      />

      <div className="mt-2">
        <div>
          <h6>This Product Name</h6>
          <span className="text-muted">Rp. 44.000</span>
        </div>

        <div className="d-flex flex-row justify-content-end">
          <button className="btn btn-info rounded-pills mt-2">
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
