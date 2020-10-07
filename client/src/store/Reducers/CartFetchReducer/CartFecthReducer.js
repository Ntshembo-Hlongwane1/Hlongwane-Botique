import {
  FETCH_CART_FAIL,
  FETCH_CART_REQUEST,
  FETCH_CART_SUCCESS,
} from "../../Actions/CartFetch/actionTypes";

const cartFetchReducer = (state = { userCart: [] }, action) => {
  switch (action) {
    case FETCH_CART_REQUEST:
      return { loading: true };
    case FETCH_CART_SUCCESS:
      return { loading: false, userCart: action.payload };
    case FETCH_CART_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export default cartFetchReducer;
