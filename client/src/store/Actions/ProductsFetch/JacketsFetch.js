import {
  PRODUCT_FETCH_FAIL,
  PRODUCT_FETCH_REQUEST,
  PRODUCT_FETCH_SUCCESS,
} from "./actionTypes";
import axios from "axios";

export const JacketsFetchAction = () => async (dispatch) => {
  const url = "http://127.0.0.1:5000/api/clothes/jackets";
  const production_url = "/api/clothes/jackets";
  try {
    dispatch({ type: PRODUCT_FETCH_REQUEST });
    const { data } = await axios.get(production_url);
    dispatch({ type: PRODUCT_FETCH_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_FETCH_FAIL, payload: error });
  }
};
