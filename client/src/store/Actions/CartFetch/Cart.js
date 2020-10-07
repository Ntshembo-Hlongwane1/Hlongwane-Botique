import {
  FETCH_CART_FAIL,
  FETCH_CART_REQUEST,
  FETCH_CART_SUCCESS,
} from "./actionTypes";
import axios from "axios";

const cartFecthAction = (token) => async (dispatch) => {
  const url = "http://127.0.0.1:5000/api/user-cart";

  const production_url = "/api/user-cart";
  try {
    dispatch({ type: FETCH_CART_REQUEST });
    const { data } = await axios.get(production_url, {
      headers: {
        "x-auth-token": token,
      },
    });
    console.log(data.cart);
    dispatch({ type: FETCH_CART_SUCCESS, payload: data.cart });
  } catch (error) {
    dispatch({ type: FETCH_CART_FAIL, payload: error });
  }
};

export default cartFecthAction;
