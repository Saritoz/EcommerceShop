const {
  createProduct,
  getBasicInfoProducts,
  getInfoProduct,
  updateDiscount,
  findProductMatching,
  getDiscountProducts,
  getBestSellerProduct,
  getProductbyCategory,
} = require("../controllers/productControllers");
const { verifyToken } = require("../controllers/middlewareControllers");

const router = require("express").Router();

router.post("/add", verifyToken, createProduct);
router.get("/mininfo", getBasicInfoProducts);
router.post("/find", findProductMatching);
router.get("/discount", getDiscountProducts);
router.get("/list", getProductbyCategory);
router.get("/bestseller", getBestSellerProduct);
router.get("/:id", getInfoProduct);
router.put("/:id/discount", verifyToken, updateDiscount);

module.exports = router;
