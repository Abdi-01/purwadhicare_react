import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Button, Modal, Col } from "react-bootstrap";
import { API_URL } from "../constants/API";
import axios from "axios";
import Swal from "sweetalert2";

function OrderCard(props) {
  const globalUser = useSelector((state) => state.user);
  const [uploadImg, setUploadImg] = useState({
    nameImg: "",
    previewImg:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/1024px-User-avatar.svg.png",
    addFile: "",
  });
  const [show, setShow] = useState(false);
  const [showTrans, setShowTrans] = useState(false);
  const [detailTrans, setDetailTrans] = useState([]);
  const handleClose = () => setShow(false);
  const handleCloseTrans = () => setShowTrans(false);
  const fetchTransaction = (idorder) => {
    axios
      .get(API_URL + "/transaction/detail-transaction/" + idorder)
      .then((res) => {
        console.log(res.data);
        setDetailTrans(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const price = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "IDR",
  }).format(props.orderData.order_price);

  const date = props.orderData.order_date
    .slice(0, 10)
    .split("-")
    .reverse()
    .join("/");

  const handleShowTrans = (idorder) => {
    fetchTransaction(idorder);
    setShowTrans(true);
  };
  const handleShow = () => {
    setShow(true);
  };
  const RenderDetailProduct = () => {
    if (detailTrans.length > 0) {
      console.log(detailTrans);
      let date = detailTrans[0].order_date
        .slice(0, 10)
        .split("-")
        .reverse()
        .join("/");
      let totalPrice = 0;
      let totalRecipe = 0;
      for (let i = 0; i < detailTrans.length; i++) {
        totalPrice += detailTrans[i].price_stock * detailTrans[i].quantity;
      }

      for (let i = 0; i < detailTrans.length; i++) {
        totalRecipe += detailTrans[i].price_unit;
      }
      return (
        <Modal show={showTrans} onHide={handleCloseTrans} centered>
          <Modal.Header closeButton></Modal.Header>

          <Modal.Body>
            <Col xs={12}>
              <h5 className="text-success text-center">
                <strong>STATUS PRODUK</strong>
              </h5>
              <hr />
              <h6>Status:</h6>
              <span>
                {detailTrans[0].order_status === "Menunggu Pengiriman" ? (
                  <span className="badge badge-soft-primary">
                    {detailTrans[0].order_status}
                  </span>
                ) : detailTrans[0].order_status === "Validasi Resep" ? (
                  <span className="badge badge-soft-warning">
                    {detailTrans[0].order_status}
                  </span>
                ) : detailTrans[0].order_status === "Order Selesai" ? (
                  <span className="badge badge-soft-success">
                    {detailTrans[0].order_status}
                  </span>
                ) : (
                  <span className="badge badge-soft-danger">
                    {detailTrans[0].order_status}
                  </span>
                )}
              </span>
              <h6>Nama Costumer:</h6>
              <span>{detailTrans[0].full_name}</span>
              <h6>Tanggal Transaksi:</h6>
              <span>{date}</span>
              <h6>Nomor Pengiriman:</h6>
              <span>{detailTrans[0].idshipping}</span>
              <h6>Alamat Pengiriman:</h6>
              <span>{detailTrans[0].address}</span>
            </Col>
            {detailTrans[0].recipe_image === null ? (
              <Col xs={12}>
                <br />
                <h5 className="text-success text-center">
                  <strong>DETAIL PRODUK</strong>
                </h5>
                <hr />
                <h6>Nama Produk:</h6>
                {detailTrans.map((item, i) => (
                  <div key={i}>
                    {item.product_name} x {item.quantity} : Rp
                    {item.price_stock * item.quantity}
                  </div>
                ))}

                <div>Ongkir: Rp.{detailTrans[0].order_price - totalPrice}</div>
                <div>
                  <strong>Total Harga: Rp.{detailTrans[0].order_price}</strong>
                </div>
                <br />
              </Col>
            ) : (
              <Col xs={12}>
                <br />
                <h5 className="text-success text-center">
                  <strong>DETAIL PRODUK</strong>
                </h5>
                <hr />
                <h6>Nama Produk:</h6>
                {detailTrans.map((item, i) => (
                  <div key={i}>
                    {item.product_name} x {item.total_netto} {item.unit} : Rp
                    {item.price_unit}
                  </div>
                ))}

                <div>Ongkir: Rp.{detailTrans[0].order_price - totalRecipe}</div>
                <div>
                  <strong>Total Harga: Rp.{detailTrans[0].order_price}</strong>
                </div>
                <br />
              </Col>
            )}

            <Col xs={12}>
              <h5 className="text-success text-center">
                <strong>BUKTI PEMBAYARAN</strong>
              </h5>
              <hr />
              <div className="d-flex flex-column justify-content-center">
                {detailTrans[0].payment_image === null ? (
                  <h6 className="text-center">User Belum Membayar</h6>
                ) : (
                  <img
                    className="img-fluid rounded z-depth-2 "
                    src={API_URL + detailTrans[0].payment_image}
                    alt="Bukti Pembayaran"
                  />
                )}
              </div>
            </Col>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      );
    }
    return null;
  };

  const imageHandler = (e) => {
    if (e.target.files[0]) {
      setUploadImg({
        ...uploadImg,
        nameImg: e.target.files[0].name,
        previewImg: URL.createObjectURL(e.target.files[0]),
        addFile: e.target.files[0],
      });
      console.log(uploadImg.nameImg);
    }
  };

  const uploadBtnHandler = (e) => {
    if (uploadImg.addFile) {
      let formData = new FormData();
      formData.append("file", uploadImg.addFile);
      axios
        .post(
          API_URL +
            `/order/payment/${globalUser.user.iduser}/${props.orderData.idorder}`,
          formData,
          {
            params: {
              oldFile: props.orderData.payment_image,
            },
          }
        )
        .then((res) => {
          props.setOrderList((prevData) => {
            return prevData.map((data) => {
              if (data.idorder === props.orderData.idorder) {
                return { ...data, order_status: "Menunggu Pengiriman" };
              }
              return data;
            });
          });
          Swal.fire("Upload File!", res.data.message, "success");
        })
        .catch((err) => {
          console.log(err);
          Swal.fire("Upload File!", "Upload File gagal", "error");
        });
    }
  };
  const paymentBtn = () => {
    console.log(show);
    return (
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Kirim Bukti Pembayaran</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex flex-column justify-content-center">
            <img
              src={
                !props.orderData.payment_image
                  ? uploadImg.previewImg
                  : uploadImg.addFile
                  ? uploadImg.previewImg
                  : API_URL + props.orderData.payment_image
              }
              className="img-fluid rounded z-depth-2 "
              alt="Cinque Terre"
            ></img>
          </div>
          <input
            onChange={imageHandler}
            className="form-control mt-3"
            type="file"
            placeholder="input title here"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={uploadBtnHandler}
            disabled={!uploadImg.addFile ? "disabled" : null}
          >
            Upload Payment
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };
  return (
    <div className="card w-full shadow-lg">
      <div className="card-body">
        <div className="row mb-1">
          <div className="col-md-10">
            <h6 className="text-muted font-weight-light">
              Id Order: {props.orderData.idorder}
            </h6>
          </div>
        </div>
        <div className="row">
          <div className="col-md-3">
            <div className="row">
              <div className="col">
                <h6 className=" m-0">Total Harga Obat</h6>
                <p className="text-secondary">{price}</p>
                <button
                  className="btn btn-info btn-sm"
                  onClick={() => {
                    handleShowTrans(props.orderData.idorder);
                  }}
                >
                  Lihat Detail
                </button>
                {RenderDetailProduct()}
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="row">
              <i className="bi bi-calendar-event" />
              <div className="col">
                <h6 className="m-0">Tanggal Pemesanan: {date}</h6>
              </div>
            </div>
          </div>
          {props.orderData.order_status == "Menunggu Pembayaran" ? (
            <>
              <div className="col-md-3">
                <span className="badge badge-soft-warning text-white">
                  {props.orderData.order_status}
                </span>
              </div>
              <div className="col-md-2 text-center">
                <button className="btn btn-warning" onClick={handleShow}>
                  Bayar Sekarang
                </button>
                {paymentBtn()}
              </div>
            </>
          ) : props.orderData.order_status == "Validasi Resep" ? (
            <>
              <div className="col-md-3">
                <span className="badge badge-soft-warning  text-white">
                  {props.orderData.order_status}
                </span>
              </div>
              <div className="col-md-2 text-center">
                <button
                  className="btn btn-warning"
                  onClick={handleShow}
                  disabled
                >
                  Bayar Sekarang
                </button>
              </div>
            </>
          ) : props.orderData.order_status == "Transaksi Dibatalkan" ? (
            <>
              <div className="col-md-3">
                <span className="badge badge-soft-danger  text-white">
                  {props.orderData.order_status}
                </span>
              </div>
              <div className="col-md-2 text-center">
                <button className="btn btn-success" disabled>
                  Pembayaran Berhasil
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="col-md-3">
                <span className="badge badge-soft-primary  text-white">
                  {props.orderData.order_status}
                </span>
              </div>
              <div className="col-md-2 text-center">
                <button className="btn btn-success" disabled>
                  Pembayaran Berhasil
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default OrderCard;
