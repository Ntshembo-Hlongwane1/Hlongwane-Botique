import { combineReducers, applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import cartFetchReducer from "./Reducers/CartFetchReducer/CartFecthReducer";
import { HoodiesFecthReducer } from "./Reducers/ProductsFecthReducer/HoodiesFetchReducer";
import { JacketsFetchReducer } from "./Reducers/ProductsFecthReducer/JacketsFecthReducer";
import productDetailsFetchReducer from "./Reducers/ProductsFecthReducer/ProductDetailsFetchReducer";
import { T_ShirtsFetchReducer } from "./Reducers/ProductsFecthReducer/T-ShirtFetchReducer";

const initialState = {};

const reducers = combineReducers({
  Hoodies: HoodiesFecthReducer,
  Jackets: JacketsFetchReducer,
  T_Shirts: T_ShirtsFetchReducer,
  ProductDetail: productDetailsFetchReducer,
  cart: cartFetchReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(
  reducers,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);
