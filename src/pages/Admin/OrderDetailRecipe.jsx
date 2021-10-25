/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Axios from "axios";
import { API_URL } from "../../constants/API";
import { Button, Modal, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { formatRupiah } from "../../helpers/formatRupiah";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";

const OrderDetailRecipe = () => {
  const history = useHistory();
  const { idorder } = useParams();
  const [filterProductList, setFilterProductList] = useState([]);
  const [shipping, setShipping] = useState([]);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(0);
  const [itemPerPage, setItemPerPage] = useState(5);
  const [show, setShow] = useState(false);
  const [courier, setCourier] = useState([]);
  const [totalPrice, setTotalPrice] = useState({
    subTotal: 0,
    ongkir: 0,
    total: 0,
    jasa: false,
  });
  // Menyimpan data product ketika klik tombol tambah
  const [addRecipe, setAddRecipe] = useState({
    idproduct: 0,
    total_netto: 0,
    price_unit: 0,
    unit: "",
    name_product: "",
  });
  // Menyimpan data sementara pada tiap inputan product
  const [addProduct, setAddProduct] = useState();
  // Menyimpan list daftar obat yang akan dikirim ke detail order
  const [recipeProduct, setRecipeProduct] = useState([]);

  useEffect(() => {
    fetchProduct();
    fetchShipping();
  }, []);

  useEffect(() => {
    if (recipeProduct.length) {
      fetchOngkir();
    }
  }, [recipeProduct]);

  useEffect(() => {
    renderTotalPrice();
  }, [totalPrice.ongkir]);

  // Get data product obat
  const fetchProduct = () => {
    Axios.get(API_URL + "/product/inventory/")
      .then((res) => {
        setFilterProductList(res.data[0]);
        setMaxPage(Math.ceil(res.data[0].length / itemPerPage));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // Get data detail pengiriman
  const fetchShipping = () => {
    Axios.get(API_URL + `/order/detail-recipe-admin/${idorder}`)
      .then((res) => {
        setShipping(res.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // Get data jasa kurir
  const fetchOngkir = () => {
    var weight = 0.1;
    recipeProduct.forEach((val) => {
      if (val.unit === "mg") {
        weight += parseFloat(val.total_netto / 1000);
      } else {
        weight += parseFloat(val.total_netto);
      }
    });
    Axios.post(API_URL + "/ongkir/cost", {
      destination: shipping.city,
      weight,
    })
      .then((res) => {
        setCourier(res.data);
      })
      .catch((err) => {
        console.log(err);
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

  // Button menambah harga kurir
  const ongkirBtnHandler = (totalOngkir, jasa) => {
    setTotalPrice({ ...totalPrice, ongkir: totalOngkir, jasa: `JNE ${jasa}` });
  };

  // Button menutup modal
  const closeBtnHandler = () => {
    setAddProduct([]);
    setShow(false);
  };

  // Button menghapus product recipe
  const deleteBtnhandler = (e, val) => {
    const newList = recipeProduct.filter((item) => item.idproduct !== val);
    setRecipeProduct(newList);
    if (recipeProduct.length === 1) {
      setCourier([]);
      setTotalPrice({ ...totalPrice, total: 0 });
    }
  };

  // Menyimpan data list kedalam state
  const saveBtnHandler = () => {
    const { idorder, idproduct, total_netto, price, product_name, unit, prev_total_netto } = addProduct;
    if (total_netto > prev_total_netto) {
      alert("Inputan melebihi netto saat ini");
    } else {
      const findId = recipeProduct.find((item) => item.idproduct === idproduct);
      if (findId) {
        alert("Maaf anda telah memasukan product yang sama, silahkan hapus lalu input ulang product");
      } else {
        setRecipeProduct([...recipeProduct, { idorder, idproduct, total_netto, prev_total_netto, price, product_name, unit }]);
        const totalHarga = parseInt(totalPrice.total + price);
        setTotalPrice({ ...totalPrice, subTotal: parseInt(totalHarga), total: parseInt(totalHarga) });
        closeBtnHandler();
      }
    }
  };

  // Handler simpan data obat yang telah diinput
  const inputHandler = (e, val) => {
    const total_netto = e.target.value;
    const { idproduct, price_unit, product_name, unit } = val;
    const price = parseInt(total_netto * price_unit);
    setAddProduct({
      idorder,
      idproduct,
      total_netto,
      prev_total_netto: val.total_netto,
      price,
      product_name,
      unit,
    });
  };

  // Hanndle submit all

  const submitBtnHandler = () => {
    const dataOrder = {
      idorder,
      order_price: parseInt(totalPrice.total),
    };
    console.log(recipeProduct);

    Axios.post(API_URL + "/order/recipe-product", {
      order: dataOrder,
      detail_order: recipeProduct,
    })
      .then((res) => {
        setRecipeProduct([]);
        setCourier([]);
        Swal.fire({
          icon: "success",
          title: "Berhasil Melakukan Input Resep Obat",
          text: "Silahkan tunggu konsumen membayar resep tersebut.",
        }).then((result) => {
          history.push("/order-recipe");
        });
      })
      .catch((err) => {
        console.log(err);
      });

    console.log(dataOrder);
  };

  // Menampilkan data obat ketika klik button untuk modal
  const editToggle = (val) => {
    setAddRecipe({
      idproduct: val.idproduct,
      total_netto: val.total_netto,
      price_unit: parseInt(val.price_unit),
      unit: val.unit,
      product_name: val.product_name,
    });
    setShow(true);
  };

  const renderTotalPrice = () => {
    const total = parseInt(totalPrice.ongkir + totalPrice.subTotal);
    setTotalPrice({ ...totalPrice, total });
  };

  // render komponen product
  const renderProduct = () => {
    const beginningIndex = (page - 1) * itemPerPage;
    let rawData = [...filterProductList];
    const currentData = rawData.slice(beginningIndex, beginningIndex + itemPerPage);

    return currentData.map((val) => {
      return (
        <tr key={val.row_number}>
          <th scope="row">{val.row_number}</th>
          <td>{val.product_name}</td>
          <td>{val.stock_bottle} Botol</td>
          <td>{val.netto > 0 ? `${val.netto} ${val.unit}` : "Stok Kosong"}</td>
          <td>{val.total_netto > 0 ? `${val.total_netto} ${val.unit}` : "Stok Kosong"}</td>
          <td>
            <button
              disabled={val.total_netto ? null : "disabled"}
              className="btn btn-primary btn-sm"
              onClick={() => editToggle(val)}
            >
              Input Stok
            </button>
          </td>
          {val.idproduct === addRecipe.idproduct ? (
            <Modal show={show} onHide={closeBtnHandler} centered key={val.idproduct}>
              <Modal.Header closeButton>
                <Modal.Title>Input Stock Product {val.product_name}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                Total netto tersedia :{" "}
                <b>
                  {val.total_netto} {val.unit}
                </b>
                <Form>
                  <div className="form-group my-3">
                    <label htmlFor="exampleFormControlInput1">Input Netto</label>
                    <input type="number" name="inputNetto" onChange={(e) => inputHandler(e, val)} className="form-control" />
                  </div>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={closeBtnHandler}>
                  Close
                </Button>
                <Button variant="primary" onClick={() => saveBtnHandler()}>
                  Submit
                </Button>
              </Modal.Footer>
            </Modal>
          ) : null}
        </tr>
      );
    });
  };

  // render komponen obat resep
  const renderRecipe = () => {
    return (
      <>
        <p className="sub-header pt-2">List Obat Racikan.</p>
        <div className="table-responsive">
          <table className="table m-0">
            <thead>
              <tr>
                <th>#</th>
                <th>Nama Obat</th>
                <th>Total Netto Dipesan</th>
                <th>Harga Obat</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {recipeProduct.length
                ? recipeProduct.map((value, index) => {
                    return (
                      <tr key={value.idproduct}>
                        <th scope="row">{index + 1}</th>
                        <td>{value.product_name}</td>
                        <td>
                          {value.total_netto} {value.unit}
                        </td>
                        <td>{formatRupiah(value.price)}</td>
                        <td>
                          <button className="btn btn-danger btn-sm" onClick={(e) => deleteBtnhandler(e, value.idproduct)}>
                            Hapus Obat
                          </button>
                        </td>
                      </tr>
                    );
                  })
                : null}
            </tbody>
          </table>
        </div>
      </>
    );
  };

  // render jasa ongkir
  const renderOngkir = () => {
    return (
      <div className="back-to-shop">
        <p className="sub-header">
          Daftar Jasa Pengiriman <b>JNE</b>
        </p>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Servis</th>
              <th scope="col">Deskripsi</th>
              <th scope="col">Waktu Pengiriman</th>
              <th scope="col">Biaya Pengiriman</th>
              <th scope="col">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {courier.length
              ? courier.map((value) => {
                  return value.costs.map((val, index) => {
                    return (
                      <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{val.service}</td>
                        <td>{val.description}</td>
                        <td>{val.cost[0].etd} Hari</td>
                        <td>{formatRupiah(val.cost[0].value)}</td>
                        <td>
                          <button
                            className="btn btn-secondary btn-sm"
                            onClick={() => ongkirBtnHandler(val.cost[0].value, val.service)}
                          >
                            Pilih
                          </button>
                        </td>
                      </tr>
                    );
                  });
                })
              : null}
          </tbody>
        </table>
      </div>
    );
  };

  // render komponen detail pengiriman
  const renderShipping = () => {
    return (
      <div className="summary">
        <div>
          <h5>
            <b>Detail Pengiriman</b>
          </h5>
        </div>
        <hr />
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Nama Lengkap</label>
          <input type="text" className="form-control" readOnly defaultValue={shipping.full_name} />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Nomor Telepon</label>
          <input type="text" className="form-control" readOnly defaultValue={shipping.phone_number} />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Alamat</label>
          <textarea name="address" className="form-control" cols="30" rows="4" readOnly defaultValue={shipping.address} />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Provinsi</label>
          <input type="text" className="form-control" readOnly defaultValue={shipping.province} />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Kota / Kabupaten</label>
          <input type="text" className="form-control" readOnly value={shipping.type + " " + shipping.city_name} />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Kecamatan</label>
          <input type="text" className="form-control" readOnly defaultValue={shipping.districts} />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Kode Pos</label>
          <input type="text" className="form-control" readOnly defaultValue={shipping.postal_code} />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Catatan</label>
          <input type="text" className="form-control" readOnly defaultValue={shipping.notes} />
        </div>
        {totalPrice.jasa ? (
          <div className="row" style={{ padding: "2vh 0" }}>
            <div className="col">Jasa</div>
            <div className="col text-right">{totalPrice.jasa}</div>
          </div>
        ) : null}

        <div className="row" style={{ borderTop: "1px solid rgba(0,0,0,.1)", padding: "2vh 0" }}>
          <div className="col">Total Harga</div>
          <div className="col text-right">{formatRupiah(totalPrice.total)}</div>
        </div>
        {totalPrice.jasa ? (
          <button className="btn btn-primary btn-block mt-3" onClick={() => submitBtnHandler()}>
            Submit
          </button>
        ) : null}
      </div>
    );
  };

  return (
    <div className="content-page">
      <div className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-7">
              <div className="card">
                <div className="card-body">
                  <h4 className="header-title mt-0 mb-1">List Order Recipe</h4>
                  <p className="sub-header">
                    Menampilkan kesulurhan daftar order product berdasarkan resep racikan dokter yang belum diproses oleh admin.
                  </p>
                  <img
                    src={API_URL + shipping.recipe_image}
                    className="img-fluid rounded float-left"
                    style={{ cursor: "pointer" }}
                    alt="resep"
                    onClick={() => window.open(API_URL + shipping.recipe_image, "_blank")}
                  />
                  <div className="table-responsive">
                    <table className="table m-0">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Nama Obat</th>
                          <th>Stok Tersedia</th>
                          <th>Netto perBotol</th>
                          <th>Total Netto</th>
                          <th>Aksi</th>
                        </tr>
                      </thead>
                      <tbody>{renderProduct()}</tbody>
                    </table>
                    <ul className="pagination pagination-rounded">
                      <li className="paginate_button page-item previous" id="basic-datatable_previous">
                        <button
                          disabled={page === 1}
                          aria-controls="basic-datatable"
                          onClick={prevPageHandler}
                          className="page-link"
                        >
                          <i className="uil uil-angle-left" />
                        </button>
                      </li>
                      <li className="paginate_button page-item disabled">
                        <span className="page-link">
                          Page {page} of {maxPage}{" "}
                        </span>
                      </li>
                      <li className="paginate_button page-item next" id="basic-datatable_next">
                        <button
                          disabled={page === maxPage}
                          aria-controls="basic-datatable"
                          onClick={nextPageHandler}
                          className="page-link"
                        >
                          <i className="uil uil-angle-right" />
                        </button>
                      </li>
                    </ul>
                    {recipeProduct.length > 0 ? renderRecipe() : null}
                    {renderOngkir()}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-5">{renderShipping()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailRecipe;
