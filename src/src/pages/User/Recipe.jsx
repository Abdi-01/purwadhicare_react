import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
// import { Button, Modal, Form, InputGroup } from "react-bootstrap";
import { API_URL } from "../../constants/API";
import axios from "axios";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const Recipe = () => {
  const globalUser = useSelector((state) => state.user);
  const [userData, setUserData] = useState([]);
  const [uploadImg, setUploadImg] = useState({
    nameImg: "",
    previewImg:
      "https://icon-library.com/images/file-icon-png/file-icon-png-23.jpg",
    addFile: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get(API_URL + "/user/order", {
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

  console.log(userData);

  const uploadBtnHandler = (e) => {
    if (uploadImg.addFile) {
      let formData = new FormData();
      formData.append("file", uploadImg.addFile);
      axios
        .patch(API_URL + "/user/recipe/" + globalUser.user.iduser, formData, {
          params: {
            oldFile: userData.recipe_image,
          },
        })
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

  return (
    <div className="col-3 px-5">
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
      </div>
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
        Ubah Foto
      </button>
    </div>
  );
};

export default Recipe;
