const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");
//MiddleWare
app.use(cors());

//========================================================Routes constants================================================
const addProductRoute = require("./Routes/AddingProductsRoute/AddingProducts");
const productFetchRoute = require("./Routes/ProductFetchRoute/ProductFetch");
const userAuthRoute = require("./Routes/Auth/User");
const cartRoute = require("./Routes/CartRoute/Cart");
//============================================================Routes Entry=================================================
app.use(addProductRoute);
app.use(productFetchRoute);
app.use(userAuthRoute);
app.use(cartRoute);

//===========================================================SETTING SERVER FOR PRODUCTION=================================
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (request, response) => {
    response.sendFile(
      path.resolve(__dirname, "./client", "build", "index.html")
    );
  });
}

//==========================================================Server Entry Point=============================================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on Port ${PORT}`);
});
