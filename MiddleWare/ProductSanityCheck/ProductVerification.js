const Formidable = require("formidable");
const {
  Hoodies,
  Jackets,
  T_Shirts,
} = require("../../Models/ProductsModel/Products");

const productVerification = (request, response, next) => {
  const form = new Formidable.IncomingForm();
  form.parse(request, async (error, fields, files) => {
    const { productID, productPrice, productCategory } = fields;

    if (productCategory === "hoodies") {
      const isValid = await Hoodies.findOne({
        _id: productID,
        productPrice: productPrice,
      });

      if (!isValid) {
        return response.status(400).json({ msg: "Unknown Products" });
      }
      next();
    } else if (productCategory === "jackets") {
      const isValid = await Jackets.findOne({
        _id: productID,
        productID: productID,
      });

      if (!isValid) {
        return response.status(400).json({ msg: "Unknown Products" });
      }
      next();
    } else {
      const isValid = await T_Shirts.findOne({
        _id: productID,
        productID: productID,
      });

      if (!isValid) {
        return response.status(400).json({ msg: "Unknown Products" });
      }
      next();
    }
  });
};

module.exports = { productVerification };
