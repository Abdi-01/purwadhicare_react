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
  });
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState([]);
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
      params: {
        iduser: globalUser.user.iduser,
      },
    })
      .then((res) => {
        console.log(res.data);
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
    console.log(userData.recipe_image);
    if (uploadImg.addFile) {
      let formData = new FormData();
      formData.append("file", uploadImg.addFile);
      Axios.post(
        API_URL + "/order/recipe/" + globalUser.user.iduser,
        formData,
        {
          params: {
            oldFile: userData.recipe_image,
          },
        }
      )
        .then((res) => {
          fetchOrder();
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
              placeholder="Nama Lengkap"
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Nomor Telepon</label>
            <input
              type="text"
              className="form-control"
              placeholder="Nomor telepon"
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Alamat</label>
            <textarea
              name=""
              id=""
              className="form-control"
              cols="30"
              rows="4"
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
              placeholder="Enter email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Kode Pos</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Catatan</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter email"
            />
          </div>
        </form>
        <button className="btn btn-primary btn-block">PESAN OBAT</button>
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
                      !userData.recipe_image
                        ? uploadImg.previewImg
                        : uploadImg.addFile
                        ? uploadImg.previewImg
                        : API_URL + userData.recipe_image
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
                  <button
                    className="btn btn-secondary btn-block mt-3"
                    disabled={!uploadImg.addFile ? "disabled" : null}
                    onClick={uploadBtnHandler}
                  >
                    Upload Resep
                  </button>
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
