import React, { useEffect, useState } from "react";

import axios from "axios";
import "../../StyleSheet/ProductDetails.css";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
const ProductsDetail = () => {
  const productID = window.location.href.split("/")[6];
  const clothing_category = window.location.href.split("/")[5];

  const [product, setProduct] = useState([]);

  const [size, setSize] = useState(28);
  const [Qty, setQty] = useState(1);

  const addToCart = () => {
    const data = new FormData();
    data.append("productName", product.productName);
    data.append("productPrice", product.productPrice);
    data.append("productID", product._id);
    data.append("Qty", Qty);
    data.append("productImage", product.productImage);

    data.append("productSize", size);

    const token = localStorage.getItem("usid");
    const url = "http://127.0.0.1:5000/api/add-to-cart";
    axios
      .post(url, data, {
        headers: {
          "x-auth-token": token,
        },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => console.log(error.response.data.msg));

    console.log(token);
  };
  useEffect(() => {
    const url = `http://127.0.0.1:5000/api/clothes/product-detail/${clothing_category}/${productID}`;
    const production_url = `/api/clothes/product-detail/${clothing_category}/${productID}`;
    axios
      .get(url)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div className="ProductDetails__container">
      {product && (
        <div className="ProductDetail__container">
          <div className="ProductDetail__image">
            <div className="image">
              <img src={product.productImage} alt="Product" />
            </div>
            <div className="details">
              <div className="description">
                <h3>Description</h3>
                <h4>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Voluptate fugit accusantium, ipsa, recusandae nostrum est
                  repellendus adipisci excepturi quam temporibus rem minus a
                  dicta. Totam dolor maiores perferendis quam. Saepe suscipit
                  excepturi corporis deserunt, nihil placeat voluptas unde, ea
                  ducimus a accusantium illo sapiente repudiandae?
                </h4>
              </div>

              <div className="shipping__nReturn">
                <h3>Shipping & Returns</h3>
                <h4>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Perspiciatis, praesentium placeat voluptatum earum at quo fuga
                  ut alias officia molestias soluta facere cupiditate, magni
                  quisquam delectus sequi. Dolorem hic, quae ex, sunt quam
                  dolores quibusdam atque, accusantium temporibus nemo facilis
                  magnam sequi labore dolore iste!
                </h4>
              </div>
            </div>
          </div>
          <div className="productSummary">
            <div className="productName">
              <div className="name">
                <h3>{product.productName}</h3>
                <h3>{`R${product.productPrice}`}</h3>
              </div>
              <div className="wishlist">
                <FavoriteBorderIcon />
              </div>
            </div>
            <div className="core__details">
              <h4> Size availability</h4>
              Size:
              <select onChange={(e) => setSize(e.target.value)} value={size}>
                <option value={28}>28</option>
                <option value={30}>30</option>
                <option value={32}>32</option>
                <option value={34}>34</option>
                <option value={36}>36</option>
                <option value={40}>40</option>
              </select>
              Qty:
              <select onChange={(e) => setQty(e.target.value)} value={Qty}>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
                <option value={6}>6</option>
              </select>
              <br />
              <button onClick={addToCart}>ADD TO CART</button>
              <div className="shipping__text">
                <LocalShippingIcon />
                <h3>Free Shipping & Returns</h3>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsDetail;
