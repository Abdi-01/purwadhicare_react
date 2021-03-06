import Axios from "axios";
import { API_URL } from "../../constants/API";
import Swal from "sweetalert2";

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
      Swal.fire("Log In Berhasil!", "Please Check Your Email 📧", "success");
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
    const resultCart = await Axios.get(`${API_URL}/cart/get?iduser=${dataLogin.iduser}`);
    dispatch({
        type: "FILL_CART",
        payload: resultCart.data,
      });
    if (dataLogin.role === "user") {
      Swal.fire(
        "Log In Berhasil!",
        "Mari Berbelanja bersama Purwadhicare 😉",
        "success"
      );
      history.push("/");
    } else {
      history.push("/dashboard");
    }
    dispatch({ type: "LOADING", payload: false });
  } catch (err) {
    Swal.fire(
      "Login Gagal",
      "username / password yang anda masukkan salah",
      "error"
    );
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
export const userKeepLogin = (jwtToken) => {
  return (dispatch) => {
    Axios.get(API_URL + "/user/profile", {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    })
      .then((result) => {
        delete result.data[0].password;
        localStorage.setItem("user_data", JSON.stringify(result.data[0]));
        // dispatch(getCartData(result.data[0].iduser))
        dispatch({
          type: "LOGIN",
          payload: result.data[0],
        });
      })
      .catch((err) => {
        localStorage.removeItem("token");
        localStorage.removeItem("user_data");
        Swal.fire({
          icon: "warning",
          title: "Sesi Anda Habis",
          text: err.response.data.message,
        }).then((result) => {
          window.location.reload();
        });
      });
  };
};

export const checkStorage = () => {
  return {
    type: "CHECK_STORAGE",
  };
};
