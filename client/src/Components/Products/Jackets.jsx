import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import screenLoader from "../../images/screenLoad.gif";
import { JacketsFetchAction } from "../../store/Actions/ProductsFetch/JacketsFetch";
import { Link } from "react-router-dom";
import "../../StyleSheet/Products.css";
const Jackets = () => {
  const dispatch = useDispatch();
  const { loading, error, jacketsList } = useSelector((state) => state.Jackets);
  const clothing_category = window.location.href.split("/")[4];
  useEffect(() => {
    dispatch(JacketsFetchAction());
  }, []);
  return (
    <div className="Products__container">
      {loading ? (
        <img src={screenLoader} alt="Products" />
      ) : error ? (
        <h1>Server is currently down :( </h1>
      ) : (
        <div className="prod__container">
          <h1>Jackets</h1>
          <div className="ProductList__container">
            {jacketsList.map((item) => {
              return (
                <div className="product__container" key={item._id}>
                  <Link to={`/clothes/detail/${clothing_category}/${item._id}`} className="product__link">
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

export default Jackets;
