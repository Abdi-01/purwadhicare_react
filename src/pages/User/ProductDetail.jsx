/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import Axios from "axios";
import React, { useState, useEffect } from "react";
import { propTypes } from "react-bootstrap/esm/Image";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { getCartData } from "../../redux/actions";

function ProductDetail(props) {
  const [productData, setProductData] = useState({});
  const [productNotFound, setProductNotFound] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  const globalUser = useSelector((state) => state.user);

  const fetchProductData = () => {
    // alert(props.match.params.idproduct)
    Axios.get(`http://localhost:2200/product/get`, {
      params: {
        idproduct: props.match.params.idproduct,
      },
    })
      .then((result) => {
        if (result.data.length) {
          console.log(result.data[0]);
          // kalau tipe data sama data tidak perlu di spread
          setProductData(result.data[0]);
        } else {
          setProductNotFound(true);
        }
      })
      .catch(() => {
        alert("Terjadi kesalahan server");
      });
  };

  const qtyBtnHandler = (action) => {
    if (action === "increment" && quantity < productData.stock_bottle) {
      setQuantity(quantity + 1);
    } else if (action === "decrement" && quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const addToCartHandler = () => {
    // cek apa user sudah memiliki barang di cart
    Axios.get(`http://localhost:2200/cart/get`, {
      params: {
        iduser: globalUser.user.iduser,
        idproduct: productData.idproduct,
      },
    }).then((result) => {
      // jika barang sudah ada di cart user, agar hanya tambah qty saja
      console.log(result.data.length);
      if (result.data.length) {
        Axios.patch(
          `http://localhost:2200/cart/edit-cart/${result.data[0].idcart}`,
          {
            quantity: quantity + result.data[0].quantity,
          }
        )
          .then(() => {
            alert("Berhasil edit");
            dispatch(getCartData(globalUser.user.iduser));
          })
          .catch(() => {
            alert("Terjadi kesalahan server");
          });
      } else {
        // jika barang belum ada di cart
        Axios.post("http://localhost:2200/cart/add-cart", {
          iduser: globalUser.user.iduser,
          idproduct: productData.idproduct,
          quantity: quantity,
        })
          .then(() => {
            Swal.fire(
              "Berhasil Menambahkan Product",
              "Silahkan Cek Cart Anda",
              "success"
            );
            dispatch(getCartData(globalUser.user.iduser));
          })
          .catch(() => {
            alert("Terjadi kesalahan server");
          });
      }
    });
  };
  // seperti component did mount
  useEffect(() => {
    fetchProductData();
  }, []);

  return (
    <div className="container p-5">
      {productNotFound ? (
        <div className="alert alert-info mt-5">Product not found</div>
      ) : (
        <div className="row p-5">
          <div className="card product-card p-5 m-4 col-5">
            <img style={{ width: "100%" }} src={productData.image} alt="" />
          </div>

          <div className="col-6 d-flex flex-column justify-content-center">
            <h4>{productData.product_name}</h4>
            <h5>Rp. {productData.price_stock}</h5>
            <p>{productData.description}</p>
            <p>Stok Tersedia : {productData.stock_bottle}</p>
            <div className="d-flex flex-row align-items-center justify-content-center my-3">
              <button
                onClick={() => qtyBtnHandler("decrement")}
                className="mr-4 rounded-circle btn btn-info"
              >
                -
              </button>
              {quantity}
              <button
                onClick={() => qtyBtnHandler("increment")}
                className="rounded-pill btn btn-info mx-4"
              >
                +
              </button>
            </div>
            <button
              className="btn btn-info rounded-pill mt-4"
              onClick={addToCartHandler}
            >
              Add To Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetail;
