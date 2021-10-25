import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Button, Modal } from "react-bootstrap";
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
  const handleClose = () => {
    console.log("Close");
    setShow(false);
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

  const handleShow = () => setShow(true);

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
              </div>
            </div>
          </div>
          <div className="col-md-4">
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
                <span className="btn btn-warning btn-sm disabled text-white">
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
                <span className="btn btn-warning btn-sm disabled text-white">
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
          ) : (
            <>
              <div className="col-md-3">
                <span className="btn btn-primary btn-sm disabled text-white">
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
