import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HoodiesFetchAction } from "../../store/Actions/ProductsFetch/HoodiesFetch";
import screenLoader from "../../images/screenLoad.gif";
import { Link } from "react-router-dom";
import "../../StyleSheet/Products.css";
const Hoodies = () => {
  const dispatch = useDispatch();
  const { loading, error, hoodiesList } = useSelector((state) => state.Hoodies);
  const clothing_category = window.location.href.split("/")[4];
  console.log(clothing_category);
  useEffect(() => {
    dispatch(HoodiesFetchAction());
  }, []);
  return (
    <div className="Products__container">
      {loading ? (
        <img src={screenLoader} alt="Products" />
      ) : error ? (
        <h1>Server is currently down :( </h1>
      ) : (
        <div className="prod__container">
          <h1>Hoodies</h1>
          <div className="ProductList__container">
            {hoodiesList.map((item) => {
              return (
                <div className="product__container" key={item._id}>
                  <Link
                    to={`/clothes/detail/${clothing_category}/${item._id}`}
                    className="product__link"
                  >
                    <img src={item.productImage} alt="Product" />
                  </Link>
                  <h5>{item.productName}</h5>
                  <h3 className="productPrice">{`R${item.productPrice}`}</h3>
                  <div className="addProduct">
                    <div className="size">
                      <select className="selector__size">
                        <option>28</option>
                        <option>30</option>
                        <option>32</option>
                        <option>34</option>
                        <option>36</option>
                        <option>38</option>
                        <option>40</option>
                        <option>42</option>
                      </select>
                    </div>
                    <button>BUY NOW</button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Hoodies;
