const router = require("express").Router();
const jwt = require("jsonwebtoken");
const { tokenAuth } = require("../../MiddleWare/Auth/tokenAuth");
require("dotenv").config();
const Formidabele = require("formidable");
const { Users } = require("../../Models/Users/Users");
const { Cart } = require("../../Models/Cart/Cart");
const { request } = require("express");

router.post("/api/add-to-cart", tokenAuth, (request, response) => {
  const form = new Formidabele.IncomingForm();
  const token = jwt.verify(
    request.header("x-auth-token"),
    process.env.JWT_SECRET
  );
  form.parse(request, async (error, fields, files) => {
    const {
      productID,
      productName,
      productPrice,
      Qty,
      productSize,
      productImage,
    } = fields;

    const user = await Users.findOne({ _id: token.id });
    const userEmail = user.email;

    let existingCartOwner = await Cart.findOne({ owner: userEmail });

    const IncomingCartItems = {
      productID,
      productName,
      productPrice,
      productImage,
      Qty,
      productSize,
    };
    if (!existingCartOwner) {
      const cart = new Cart({
        owner: userEmail,
        cart: IncomingCartItems,
      });

      const savedCart = await cart.save();

      return response.status(200).json(savedCart);
    }

    const checkDuplicateProducts = existingCartOwner.cart.find(
      (item) => item.productID === productID
    );

    if (checkDuplicateProducts) {
      const updatedCart = existingCartOwner.cart.map((item) =>
        item.productID === productID ? IncomingCartItems : item
      );

      existingCartOwner.cart = updatedCart;

      const dataBaseUpdate = await Cart.findOneAndUpdate(
        { owner: userEmail },
        existingCartOwner,
        {
          new: true,
        }
      );
      return response.status(200).json(dataBaseUpdate);
    }

    existingCartOwner.cart = [...existingCartOwner.cart, IncomingCartItems];

    const dataBaseUpdate = await Cart.findOneAndUpdate(
      { owner: userEmail },
      existingCartOwner,
      {
        new: true,
      }
    );

    return response.status(200).json(dataBaseUpdate);
  });
});

router.post("/api/remove-from-cart", tokenAuth, async (request, response) => {
  const token = jwt.verify(
    request.header("x-auth-token"),
    process.env.JWT_SECRET
  );
  const user = await Users.findOne({ _id: token.id });
  const userEmail = user.email;

  const form = new Formidabele.IncomingForm();
  form.parse(request, async (error, fields, files) => {
    const { productID } = fields;

    const existingCartOwner = await Cart.findOne({ owner: userEmail });

    if (!existingCartOwner) {
      return response.status(400).json({ msg: "Bad Request." });
    }

    existingCartOwner.cart = existingCartOwner.cart.filter(
      (item) => item.productID !== productID
    );

    const dataBaseUpdate = await Cart.findOneAndUpdate(
      { owner: userEmail },
      existingCartOwner,
      {
        new: true,
      }
    );

    return response.status(200).json({ dataBaseUpdate });
  });
});

router.get("/api/user-cart", tokenAuth, async (request, response) => {
  try {
    const token = request.header("x-auth-token");
    const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = await Users.findById({ _id: verifiedToken.id });

    const userEmail = user.email;

    const existingCartOwner = await Cart.findOne({ owner: userEmail });

    if (!existingCartOwner) {
      
      return response.status(200).json({ cart: [] });
    }

    return response.status(200).json(existingCartOwner);
  } catch (error) {
    return response.status(500).json({ msg: "Server currently down :(" });
  }
});

module.exports = router;
