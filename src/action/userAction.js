import Axios from "axios";

// Action Untuk Fitur Register
export const register = (data, setToLogin) => {
  return async (dispatch) => {
    // console.log("Berhasil");
    dispatch({ type: "LOADING", payload: true });
    dispatch({ type: "ERROR", payload: [] });
    try {
      await Axios.put("http://localhost:2200/user/register", data);
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
    const result = await Axios.post("http://localhost:2200/user/login", data);
    localStorage.setItem("token", result.data.token);
    dispatch({ type: "LOGIN", payload: result.data.user });
    // console.log(result.data.dataLogin);
    if (result.data.dataLogin.role === "user") {
      history.push("/");
    }
    // else {
    //   history.push("/admin/dashboard");
    // }
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
      dispatch({ type: "LOGOUT" });
    } catch (err) {
      console.log(err);
    }
  };
};
