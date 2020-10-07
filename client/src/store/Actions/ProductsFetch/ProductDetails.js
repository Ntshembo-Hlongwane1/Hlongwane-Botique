import {
  PRODUCT_FETCH_FAIL,
  PRODUCT_FETCH_REQUEST,
  PRODUCT_FETCH_SUCCESS,
} from "./actionTypes";
import axios from "axios";

const productDetailFetchAction = (productID, productCategory) => async (
  dispatch
) => {
  const url = `http://127.0.0.1:5000/api/clothes/product-detail/${productCategory}/${productID}`;
  const production_url = `/api/clothes/product-detail/${productCategory}/${productID}`;
  try {
    dispatch({ type: PRODUCT_FETCH_REQUEST });
    const { data } = await axios.get(production_url);
    dispatch({ type: PRODUCT_FETCH_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_FETCH_FAIL, payload: error });
  }
};

export default productDetailFetchAction;
