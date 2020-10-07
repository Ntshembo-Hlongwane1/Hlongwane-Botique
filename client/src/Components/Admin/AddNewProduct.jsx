import React, { Component } from "react";
import "../../StyleSheet/AddNewProduct.css";
import axios from "axios";
class AddNewProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productName: "",
      productDetails: "",
      productPrice: null,
      productImage: null,
      category: "",
      status: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.addNewProduct = this.addNewProduct.bind(this);
    this.handleImage = this.handleImage.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.id]: e.target.value,
    });
  }
  handleImage(e) {
    this.setState({
      productImage: e.target.files[0],
    });
  }
  addNewProduct(e) {
    e.preventDefault();
    const data = new FormData();
    data.append("productName", this.state.productName);
    data.append("productDetails", this.state.productDetails);
    data.append("productPrice", this.state.productPrice);
    data.append("isOnSale", this.state.status);
    data.append("category", this.state.category);
    data.append("productImage", this.state.productImage);

    const url = "http://127.0.0.1:5000/api/new-product";
    const production_url = "/api/new-product";

    axios
      .post(url, data)
      .then((response) => {
        console.log(response);
        window.location.reload(false);
      })
      .catch((error) => {
        alert(error.response.data.msg);
      });
  }
  render() {
    return (
      <div className="AddProduct__container">
        <form className="Form__container">
          <h2>ADD NEW PRODUCT</h2>
          <h3>Product Name</h3>
          <input
            type="text"
            placeholder="Product Name"
            id="productName"
            onChange={this.handleChange}
          />
          <h3>Product Details</h3>
          <textarea
            placeholder="Product Details"
            className="textBox"
            cols="30"
            rows="4"
            id="productDetails"
            onChange={this.handleChange}
          ></textarea>
          <h3>Product Price</h3>
          <input
            type="number"
            placeholder="Product Price"
            id="productPrice"
            onChange={this.handleChange}
          />
          <h3>Product Image</h3>
          <input type="file" onChange={this.handleImage} id="productImage" />
          <h3>Product Category</h3>
          <select
            className="categorySelector"
            onChange={this.handleChange}
            id="category"
          >
            <option>...</option>
            <option>Hoodies</option>
            <option>Jackets</option>
            <option>T-Shirts</option>
          </select>
          <h3 className="productStatusText">Product On Sale?</h3>
          <select
            className="statusSelector"
            onChange={this.handleChange}
            id="status"
          >
            <option>...</option>
            <option value={true}>True</option>
            <option value={false}>False</option>
          </select>
          <button type="submit" onClick={this.addNewProduct}>
            ADD PRODUCT
          </button>
        </form>
      </div>
    );
  }
}

export default AddNewProduct;
