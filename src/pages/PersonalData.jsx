import React, { useEffect, useState } from "react";
import Axios from "axios";

function PersonalData() {
  const [profile, setProfile] = useState([]);
  const [addProfile, setAddPofile] = useState({
    full_name: "",
    gender: "",
    email: "",
    address: "",
    age: 0,
  });

  const [editProfile, setEditPofile] = useState({
    full_name: "",
    gender: "",
    email: "",
    address: "",
    age: 0,
  });

  // seperti component did mount
  useEffect(() => {
    // yang mau dipanggil
    Axios.get("http://localhost:2200/profile/:iduser")
      .then((result) => {
        setProfile(result.data);
      })
      .catch(() => {
        alert("Terjadi kesalahan server");
      });
  }, []);

  const inputHandler = (event) => {
    const value = event.target.value;
    const name = event.target.name;

    setAddPofile({ ...addProfile, [name]: value });
  };

  return (
    <div className="mt-5 m-4">
      <div className="d-flex flex-row justify-content-center m-4">
        <h2>Personal Data</h2>
      </div>

      <div className="row">
        <div className="mb-4 col-9 ">
          <div className="mb-4 card d-flex flex-row justify-content-center">
            <div className="card-header col-3 d-flex flex-column justify-content-center">
              <strong>Basic Data</strong>
            </div>
            <div className="card-body">
              <label htmlFor="fullName">Full Name</label>
              <input
                name="fullName"
                type="text"
                className="form-control mb-3"
              />

              <label htmlFor="gender">Gender</label>
              <select name="gender" className="form-control mb-4" id="">
                <option value="">male</option>
                <option value="">female</option>
              </select>

              <label htmlFor="email">Email</label>
              <input name="email" type="text" className="form-control mb-3" />

              <label htmlFor="address">Address</label>
              <input name="address" type="text" className="form-control mb-3" />
              <label htmlFor="age">Age</label>
              <input name="age" type="text" className="form-control mb-3" />
            </div>
          </div>

          <div className="mt-8 d-flex flex-row  justify-content-right">
            <button className="btn btn-info col-3">{"Submit"}</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PersonalData;
