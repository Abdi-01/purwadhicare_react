/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Button, Modal, Form, InputGroup } from "react-bootstrap";
import { API_URL } from "../../constants/API";
import axios from "axios";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const Profile = () => {
  const globalUser = useSelector((state) => state.user);
  const [userData, setUserData] = useState([]);
  const [uploadImg, setUploadImg] = useState({
    nameImg: "",
    previewImg:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/1024px-User-avatar.svg.png",
    addFile: "",
    id: 29,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [openPass, setOpenPass] = useState(false);
  const [show, setShow] = useState(false);
  const [password, setPassword] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const isOpen = () => (openPass ? "fas fa-eye" : "fas fa-eye-slash");
  const onChangePassword = (e) => {
    const key = e.target.attributes.name.value;
    const value = e.target.value;
    // console.log(key, value);
    setPassword((prevData) => ({ ...prevData, [key]: value }));
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // console.log(globalUser.user.iduser, newPassword);
  // console.log(globalUser.user);
  useEffect(() => {
    fetchData();
    setIsLoading(false);
  }, []);

  const fetchData = () => {
    axios
      .get(API_URL + "/user/profile", {
        params: {
          iduser: globalUser.user.iduser,
        },
      })
      .then((res) => {
        setUserData(res.data[0]);
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      });
  };

  const saveNewPassword = (e) => {
    e.preventDefault();
    // console.log(password);
    axios
      .post(API_URL + "/user/changePassword", {
        iduser: globalUser.user.iduser,
        ...password,
      })
      .then((res) => {
        Swal.fire(
          "Your New Password is Set!",
          "Silahkan Lanjut Berbelanja",
          "success"
        );
      })
      .catch((err) => {
        if (err.response.data !== 1) {
          Swal.fire("Change Password Failed!", err.response.data.msg, "error");
        }
        // err.response.data.forEach((e) => {
        //   Swal.fire("Change Password Failed!", err.response.data.msg, "error");
        // });
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
        .patch(API_URL + "/user/picture/" + globalUser.user.iduser, formData, {
          params: {
            oldFile: userData.picture,
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

  const RenderForm = () => {
    return (
      <div className="col-6">
        <form className="form-horizontal">
          <div className="form-group">
            <label className="col-lg-3 control-label">Nama Lengkap</label>
            <div className="col-lg-8">
              <input
                className="form-control"
                type="text"
                defaultValue={userData.full_name}
              />
            </div>
          </div>
          <div className="form-group">
            <label className="col-lg-3 control-label">Email</label>
            <div className="col-lg-8">
              <input
                className="form-control"
                type="text"
                defaultValue={userData.email}
              />
            </div>
          </div>
          <div className="form-group">
            <label className="col-lg-3 control-label">Umur</label>
            <div className="col-lg-8">
              <input
                className="form-control"
                type="number"
                defaultValue={userData.age}
              />
            </div>
          </div>
          <div className="form-group">
            <label className="col-lg-3 control-label">Jenis Kelamin</label>
            <div className="col-lg-8">
              <div className="ui-select">
                <select id="gender" className="form-control">
                  <option defaultValue="Laki laki">Laki Laki</option>
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

  if (isLoading) {
    return <h2 className="container">Loading.....</h2>;
  }

  return (
    <div className="content-user">
      <Helmet>
        <title>Profile | Purwadhicare</title>
      </Helmet>
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
              <button
                className="btn btn-primary btn-block mt-3"
                onClick={handleShow}
              >
                Ubah Password
              </button>
            </div>
            <RenderForm />
            <Modal show={show} onHide={handleClose} centered>
              <Modal.Header closeButton>
                <Modal.Title>Ubah Password</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label>Old Password </Form.Label>
                    <InputGroup style={{ display: "flex" }}>
                      <InputGroup.Text>
                        <i
                          className={isOpen()}
                          style={styles.password}
                          onClick={() => setOpenPass(!openPass)}
                        />
                      </InputGroup.Text>
                      <Form.Control
                        type={openPass ? "text" : "password"}
                        name="oldPassword"
                        defaultValue={password.oldPassword}
                        onChange={onChangePassword}
                        placeholder="Current Password"
                      />
                    </InputGroup>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>New Password</Form.Label>
                    <InputGroup style={{ display: "flex" }}>
                      <InputGroup.Text>
                        <i
                          className={isOpen()}
                          style={styles.password}
                          onClick={() => setOpenPass(!openPass)}
                        />
                      </InputGroup.Text>
                      <Form.Control
                        type={openPass ? "text" : "password"}
                        name="newPassword"
                        placeholder="New Password"
                        defaultValue={password.newPassword}
                        onChange={onChangePassword}
                      />
                    </InputGroup>
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Confirm New Password</Form.Label>
                    <InputGroup style={{ display: "flex" }}>
                      <InputGroup.Text>
                        <i
                          className={isOpen()}
                          style={styles.password}
                          onClick={() => setOpenPass(!openPass)}
                        />
                      </InputGroup.Text>
                      <Form.Control
                        type={openPass ? "text" : "password"}
                        name="confirmPassword"
                        defaultValue={password.confirmPassword}
                        onChange={onChangePassword}
                        placeholder="Confirm New Password"
                      />
                    </InputGroup>
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={saveNewPassword}>
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  password: {
    cursor: "pointer",
  },
};
export default Profile;
