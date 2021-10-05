import React, { useState, useEffect } from "react";
import { API_URL } from "../../constants/API";
import axios from "axios";
import Swal from "sweetalert2";

const Profile = () => {
  const [userData, setUserData] = useState([]);
  const [uploadImg, setUploadImg] = useState({
    nameImg: "",
    previewImg: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/1024px-User-avatar.svg.png",
    addFile: "",
    id: 29,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get(API_URL + "/users/profile/" + 29)
      .then((res) => {
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
    if (uploadImg.addFile) {
      let formData = new FormData();
      formData.append("file", uploadImg.addFile);
      axios
        .patch(API_URL + "/users/picture/" + uploadImg.id, formData)
        .then((res) => {
          fetchData();
          Swal.fire("Upload File!", res.data.message, "success");
        })
        .catch((err) => {
          console.log(err);
          Swal.fire("Upload File!", "Upload File gagal", "error");
        });
    }
  };

  const RenderForm = () => {
    return (
      <div className="col-6">
        <form className="form-horizontal">
          <div className="form-group">
            <label className="col-lg-3 control-label">Nama Lengkap</label>
            <div className="col-lg-8">
              <input className="form-control" type="text" value={userData.full_name} />
            </div>
          </div>
          <div className="form-group">
            <label className="col-lg-3 control-label">Email</label>
            <div className="col-lg-8">
              <input className="form-control" type="text" value={userData.email} />
            </div>
          </div>
          <div className="form-group">
            <label className="col-lg-3 control-label">Umur</label>
            <div className="col-lg-8">
              <input className="form-control" type="number" value={userData.age} />
            </div>
          </div>
          <div className="form-group">
            <label className="col-lg-3 control-label">Jenis Kelamin</label>
            <div className="col-lg-8">
              <div className="ui-select">
                <select id="user_time_zone" className="form-control">
                  <option value="Laki laki">Laki Laki</option>
                </select>
              </div>
            </div>
            <div className="form-group mt-3">
              <label className="col-lg-3 control-label">Alamat</label>
              <div className="col-lg-8">
                <textarea className="form-control" cols="30" rows="5">
                  {userData.full_name}
                </textarea>
              </div>
            </div>
          </div>
          <div className="col-lg-8">
            <button type="submit" className="btn btn-primary btn-block">
              Ubah Profile
            </button>
          </div>
        </form>
      </div>
    );
  };

  return (
    <div className="content-user">
      <div className="content">
        <div className="container-fluid ">
          <div className="d-flex flex-row justify-content-md-center my-4">
            <h2>Personal Data</h2>
          </div>
          <div className="row justify-content-md-center">
            <div className="col-3 px-5">
              <div className="d-flex flex-column justify-content-center">
                <img
                  src={
                    !userData.picture
                      ? uploadImg.previewImg
                      : uploadImg.addFile
                      ? uploadImg.previewImg
                      : API_URL + userData.picture
                  }
                  className="img-fluid rounded z-depth-2 "
                  alt="Cinque Terre"
                ></img>
              </div>
              <input onChange={imageHandler} className="form-control mt-3" type="file" placeholder="input title here" />
              <button
                className="btn btn-secondary btn-block mt-3"
                disabled={!uploadImg.addFile ? "disabled" : null}
                onClick={uploadBtnHandler}
              >
                Ubah Foto
              </button>
              <button className="btn btn-primary btn-block mt-3">Ubah Password</button>
            </div>
            <RenderForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
