const router = require("express").Router();
const mongoose = require("mongoose");
const Formidable = require("formidable");
const cloudinary = require("cloudinary").v2;
const {
  Hoodies,
  Jackets,
  AllProducts,
  T_Shirts,
} = require("../../Models/ProductsModel/Products");
require("dotenv").config();

//========================================================MongoDB and Clodinary configs===================================
const mongoURI = process.env.MONGO_URI;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

//===================================================MongoDB connection initialization=====================================
mongoose.connect(
  mongoURI,
  {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  },
  (error) => {
    if (error) {
      return console.log(error);
    }
    console.log("Connection to MongoDB was successful");
  }
);

//==============================================================Route======================================================
router.post("/api/new-product", (request, response) => {
  const form = new Formidable.IncomingForm();
  form.parse(request, async (error, fields, files) => {
    const {
      productName,
      productDetails,
      productPrice,
      isOnSale,
      category,
    } = fields;
    const { productImage } = files;

    if (!category) {
      return response
        .status(400)
        .json({ msg: "Product Category is to be specified" });
    }
    if (category === "Hoodies") {
      await cloudinary.uploader.upload(
        productImage.path,
        { folder: "/ClothingStore/Hoodies" },
        async (error, results) => {
          const image_url = results.url;

          const newHoodie = new Hoodies({
            productName: productName,
            productDetails: productDetails,
            productPrice: productPrice,
            productImage: image_url,
            isOnSale: isOnSale,
          });
          const allProducts = new AllProducts({
            productName: productName,
            productDetails: productDetails,
            productPrice: productPrice,
            productImage: image_url,
            isOnSale: isOnSale,
          });

          const savedHoodie = await newHoodie.save();
          const savedAllProducts = await allProducts.save();

          return response
            .status(200)
            .json({ hoodie: savedHoodie, allProducts: savedAllProducts });
        }
      );
    } else if (category === "Jackets") {
      await cloudinary.uploader.upload(
        productImage.path,
        { folder: "/ClothingStore/Jackets" },
        async (error, results) => {
          const image_url = results.url;

          const newJacket = new Jackets({
            productName: productName,
            productDetails: productDetails,
            productPrice: productPrice,
            productImage: image_url,
            isOnSale: isOnSale,
          });
          const allProducts = new AllProducts({
            productName: productName,
            productDetails: productDetails,
            productPrice: productPrice,
            productImage: image_url,
            isOnSale: isOnSale,
          });

          const savedHoodie = await newJacket.save();
          const savedAllProducts = await allProducts.save();

          return response
            .status(200)
            .json({ jacket: savedHoodie, allProducts: savedAllProducts });
        }
      );
    } else {
      await cloudinary.uploader.upload(
        productImage.path,
        { folder: "/ClothingStore/T-Shirt" },
        async (error, results) => {
          const image_url = results.url;

          const newT_Shirt = new T_Shirts({
            productName: productName,
            productDetails: productDetails,
            productPrice: productPrice,
            productImage: image_url,
            isOnSale: isOnSale,
          });
          const allProducts = new AllProducts({
            productName: productName,
            productDetails: productDetails,
            productPrice: productPrice,
            productImage: image_url,
            isOnSale: isOnSale,
          });

          const savedHoodie = await newT_Shirt.save();
          const savedAllProducts = await allProducts.save();

          return response
            .status(200)
            .json({ T_Shirt: savedHoodie, allProducts: savedAllProducts });
        }
      );
    }
  });
});

module.exports = router;
