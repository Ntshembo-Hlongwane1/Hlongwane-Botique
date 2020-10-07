import React from "react";
import HomePage from "./Components/HomePage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./StyleSheet/App.css";
import AddNewProduct from "./Components/Admin/AddNewProduct";
import { BrowserView } from "react-device-detect";
import DesktopNav from "./Components/Header/DesktopNav";
import Hoodies from "./Components/Products/Hoodies";
import NavBar from "./Components/Header/NavBar";
import Jackets from "./Components/Products/Jackets";
import TShirt from "./Components/Products/T-Shirts";
import ProductsDetail from "./Components/Products/ProductsDetail";

import { UserLogin } from "./Components/Auth/UserLogin";
import { UserSignUp } from "./Components/Auth/UserRegistration";
import Cart from "./Components/Cart";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/cart">
          <NavBar />
          <Cart />
        </Route>
        <Route path="/user-auth/login">
          <NavBar />
          <UserLogin />
        </Route>
        <Route path="/user-auth/register">
          <NavBar />
          <UserSignUp />
        </Route>
        <Route path="/clothes/detail/:id/:id">
          <NavBar />
          <ProductsDetail />
        </Route>
        <Route path="/clothes/jackets">
          <NavBar />
          <Jackets />
        </Route>
        <Route path="/clothes/t-shirts">
          <NavBar />
          <TShirt />
        </Route>
        <Route path="/clothes/hoodies">
          <NavBar />
          <Hoodies />
        </Route>
        <Route path="/admin/add-new-product">
          <BrowserView>
            <DesktopNav />
            <AddNewProduct />
          </BrowserView>
        </Route>
        <Route path="/">
          <HomePage />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
