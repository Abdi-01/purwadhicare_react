import Axios from "axios";
import { API_URL } from "../../constants/API";

// Action Untuk Fitur Register
export const register = (data, setToLogin) => {
  return async (dispatch) => {
    // console.log("Berhasil");
    dispatch({ type: "LOADING", payload: true });
    dispatch({ type: "ERROR", payload: [] });
    try {
      await Axios.put(API_URL + "/user/register", data);
      // eslint-disable-next-line no-lone-blocks
      {
        setToLogin(true);
      }
      alert("Register success please check your email");
    } catch (err) {
      err.response.data.forEach((e) => {
        alert(e.msg.toString());
      });
      dispatch({ type: "ERROR", payload: err.response.data });
      dispatch({ type: "LOADING", payload: false });
    }
  };
};

// Action Untuk Fitur Login
export const login = (data, history) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });
  try {
    const result = await Axios.post(API_URL + "/user/login", data);
    const { dataLogin, token } = result.data;
    delete dataLogin.password;
    localStorage.setItem("token", token);
    localStorage.setItem("user_data", JSON.stringify(dataLogin));
    dispatch({ type: "LOGIN", payload: dataLogin });
    if (dataLogin.role === "user") {
      history.push("/");
    } else {
      history.push("/dashboard");
    }
    dispatch({ type: "LOADING", payload: false });
  } catch (err) {
    console.log(err.response);
    dispatch({ type: "ERROR", payload: err.response.data });
    dispatch({ type: "LOADING", payload: false });
  }
};

// Action Untuk Fitur Logout
export const logout = () => {
  return async (dispatch) => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("user_data");
      dispatch({ type: "LOGOUT" });
    } catch (err) {
      console.log(err);
    }
  };
};

// Aksi untuk tetap login walaupun di refresh
export const userKeepLogin = (userData) => {
  return (dispatch) => {
    Axios.get(API_URL + "/user/profile", {
      params: {
        iduser: userData.iduser,
      },
    })
      .then((result) => {
        delete result.data[0].password;
        localStorage.setItem("user_data", JSON.stringify(result.data[0]));
        dispatch({
          type: "LOGIN",
          payload: result.data[0],
        });
      })
      .catch(() => {
        alert("Gagal server");
      });
  };
};

export const checkStorage = () => {
  return {
    type: "CHECK_STORAGE",
  };
};
