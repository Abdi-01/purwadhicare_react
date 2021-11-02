import Axios from "axios";
import { API_URL } from "../../constants/API";

export const getCartData = (iduser) => {
  return (dispatch) => {
    Axios.get(`${API_URL}/cart/get?iduser=${iduser}`)
      .then((result) => {
        // dispatch ke cart reducer dengan payload = result.data
        // agar payload bisa masuk ke dalam cartList
        dispatch({
          type: "FILL_CART",
          payload: result.data,
        });
      })
      .catch((err) => {
        alert("Terjadi kesalahan server");
        console.log(err);
      });
  };
};
