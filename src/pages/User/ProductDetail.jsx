import Axios from "axios"
import React, { useState, useEffect } from "react";
import { propTypes } from "react-bootstrap/esm/Image";

function ProductDetail(props) {

  const [productData, setProductData] = useState({});
  const [productNotFound, setProductNotFound] = useState(false)
  const [quantity, setQuantity] = useState(1)
  
  const fetchProductData = () => {
    // alert(props.match.params.productId)
    Axios.get(`http://localhost:2200/product/get`, {
      params : {
        idproduct : props.match.params.idproduct}
    })
    .then((result)=>{
      if (result.data.length) {
        console.log(result.data[0])
        // kalau tipe data sama data tidak perlu di spread
        setProductData(result.data[0])
      } else {
        setProductNotFound(true)
      }
     
    })
    .catch(()=>{
      alert("Terjadi kesalahan server")
    })
  }

  const qtyBtnHandler = (action) => {
    if (action === "increment") {
      setQuantity(quantity +1 )
    } else if (action === "decrement" && quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const addToCartHandler = () => {
    
  }
    // seperti component did mount
    useEffect(() => {
      fetchProductData();
    }, []);

  return (
    <div className="container p-5">
      {
        productNotFound ?
        <div className="alert alert-info mt-5">Product not found</div> 
        :
        <div className="row p-5">
        <div className="card product-card p-5 m-4 col-5">
          <img
            style={{ width: "100%" }}
            src={productData.image}
            alt=""
          />
        </div>

        <div className="col-6 d-flex flex-column justify-content-center">
          <h4>{productData.product_name}</h4>
          <h5>{productData.price_stock}</h5>
          <p>
           {productData.description}
          </p>
          <div className="d-flex flex-row align-items-center justify-content-center my-3">
            <button onClick={()=>qtyBtnHandler("decrement")} className="mr-4 rounded-circle btn btn-info">-</button>
            {quantity}
            <button onClick={()=>qtyBtnHandler("increment")} className="rounded-pill btn btn-info mx-4">+</button>
          </div>
          <button className="btn btn-info rounded-pill mt-4">Add To Cart</button>
        </div>
      </div>


      }
          </div>
  );
}

export default ProductDetail;
