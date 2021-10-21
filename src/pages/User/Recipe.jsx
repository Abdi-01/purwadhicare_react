/* eslint-disable react-hooks/exhaustive-deps */
import "../../assets/styles/cart.css";
import React, { useEffect, useState } from "react";
import Axios from "axios";
import { API_URL } from "../../constants/API";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

function Recipe() {
  const globalUser = useSelector((state) => state.user);
  const [cities, setCities] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [shipping, setShipping] = useState({
    idprovince: 0,
    idcity: 0,
    full_name: "",
    phone_number: "",
    address: "",
    districts: "",
    postal_code: "",
    notes: "",
  });
  console.log(shipping);
  const [userData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [uploadImg, setUploadImg] = useState({
    nameImg: "",
    previewImg:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/1024px-User-avatar.svg.png",
    addFile: "",
  });

  useEffect(() => {
    fetchProvince();
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchCity();
  }, [shipping.idprovince]);

  useEffect(() => {
    fetchOrder();
    setIsLoading(false);
  }, []);

  const fetchOrder = () => {
    Axios.get(API_URL + "/order/orderData", {
      headers: {
        token: localStorage.getItem("token"),
      },
    })
      .then((res) => {
        // console.log(res.data);
        setUserData(res.data[0]);
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      });
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
    e.preventDefault();
    if (uploadImg.addFile) {
      let formData = new FormData();
      const {
        full_name,
        phone_number,
        address,
        districts,
        postal_code,
        notes,
        idprovince,
        idcity,
      } = shipping;
      let formShipping = {
        full_name,
        phone_number,
        address,
        districts,
        postal_code,
        notes,
        province: idprovince,
        city: idcity,
      };

      formData.append("data", JSON.stringify(formShipping));
      formData.append("file", uploadImg.addFile);
      Axios.post(API_URL + "/order/recipe/" + globalUser.user.iduser, formData)
        .then((res) => {
          Swal.fire("Upload File!", res.data.message, "success");
        })
        .catch((err) => {
          console.log(err);
          Swal.fire("Upload File!", "Upload File gagal", "error");
        });
    }
  };

  const fetchProvince = () => {
    Axios.get(API_URL + "/ongkir/province")
      .then((res) => {
        setProvinces(res.data);
      })
      .catch(() => {
        alert("Kesalahan server");
      });
  };

  const fetchCity = () => {
    Axios.get(API_URL + "/ongkir/city/" + shipping.idprovince)
      .then((res) => {
        setCities(res.data);
      })
      .catch(() => {
        alert("Kesalahan server");
      });
  };

  const formHandler = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    setShipping({ ...shipping, [name]: value });
  };

  const renderShipping = () => {
    return (
      <div className="col-md-5 ml-5 mb-5 summary">
        <div>
          <h5>
            <b>Detail Pengiriman</b>
          </h5>
        </div>
        <hr />
        <form>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Nama Lengkap</label>
            <input
              type="text"
              className="form-control"
              name="full_name"
              placeholder="Nama Lengkap"
              onChange={formHandler}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Nomor Telepon</label>
            <input
              type="text"
              className="form-control"
              name="phone_number"
              placeholder="Nomor telepon"
              onChange={formHandler}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Alamat</label>
            <textarea
              name="address"
              className="form-control"
              cols="30"
              rows="4"
              onChange={formHandler}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Provinsi</label>
            <select
              className="form-control"
              defaultValue={"DEFAULT"}
              name="idprovince"
              onChange={formHandler}
            >
              <option disabled value="DEFAULT">
                Nama Provinsi
              </option>
              {provinces.map((value, index) => {
                return (
                  <option value={value.idprovince} key={index}>
                    {value.province}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Kota / Kabupaten</label>
            <select
              className="form-control"
              defaultValue={"DEFAULT"}
              name="idcity"
              onChange={formHandler}
            >
              <option disabled value="DEFAULT">
                Nama Kota
              </option>
              {cities.map((value, idx) => {
                return (
                  <option
                    value={value.idcity}
                    key={idx}
                  >{`${value.type} ${value.city_name}`}</option>
                );
              })}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Kecamatan</label>
            <input
              type="text"
              className="form-control"
              name="districts"
              placeholder="Kecamatan"
              onChange={formHandler}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Kode Pos</label>
            <input
              type="text"
              className="form-control"
              name="postal_code"
              placeholder="Kode Pos"
              onChange={formHandler}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Catatan</label>
            <input
              type="text"
              className="form-control"
              name="notes"
              placeholder="Catatan"
              onChange={formHandler}
            />
          </div>
          <button
            className="btn btn-primary btn-block"
            disabled={!uploadImg.addFile ? "disabled" : null}
            onClick={uploadBtnHandler}
          >
            PESAN OBAT
          </button>
        </form>
      </div>
    );
  };

  if (isLoading) {
    return <h2>Loading...</h2>;
  } else {
    return (
      <div className="content-user mb-4">
        <div className="content">
          <div className="card-cart">
            <div className="row justify-content-md-center mt-4 p-5">
              <div className="col-5">
                <div className="d-flex flex-column justify-content-center">
                  <img
                    src={
                      uploadImg.previewImg
                        ? uploadImg.previewImg
                        : uploadImg.addFile
                    }
                    className="img-fluid rounded z-depth-2 "
                    alt="Cinque Terre"
                  ></img>
                  <input
                    onChange={imageHandler}
                    className="form-control mt-3"
                    type="file"
                    placeholder="input title here"
                  />
                </div>
              </div>
              {renderShipping()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Recipe;
