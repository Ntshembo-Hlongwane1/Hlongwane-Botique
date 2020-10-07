const router = require("express").Router();
const {
  Hoodies,
  Jackets,
  T_Shirts,
} = require("../../Models/ProductsModel/Products");

//=======================================================PRODUCT FETCH ROUTE==============================================

router.get("/api/clothes/hoodies", async (request, response) => {
  await Hoodies.find()
    .exec()
    .then((hoodies) => {
      response.status(200).json(hoodies);
    });
});
router.get("/api/clothes/jackets", async (request, response) => {
  await Jackets.find()
    .exec()
    .then((jackets) => {
      response.status(200).json(jackets);
    });
});

router.get("/api/clothes/t-shirts", async (request, response) => {
  await T_Shirts.find()
    .exec()
    .then((t_shirts) => {
      response.status(200).json(t_shirts);
    });
});

router.get(
  `/api/clothes/product-detail/:productCategory/:productID`,
  async (request, response) => {
    const productCategory = request.params.productCategory;
    const productID = request.params.productID;

    if (productCategory === "hoodies") {
      await Hoodies.findOne({_id:productID}).exec().then(hoodie=>{
        response.status(200).json(hoodie)
      })
    } else if (productCategory === "jackets") {
      await Jackets.findOne({_id:productID}).exec().then(jacket=>{
        response.status(200).json(jacket)
      })
    } else {
      await T_Shirts.findOne({_id:productID}).exec().then(t_shirt=>{
        response.status(200).json(t_shirt)
      })
    }
  }
);

module.exports = router;
