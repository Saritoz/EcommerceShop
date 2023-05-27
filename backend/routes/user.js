const { verifyToken } = require("../controllers/middlewareControllers");
const {
  addProductWishList,
  addProductCart,
  removeProductWishList,
  removeProductCart,
  getProductInCart,
  getProductInWishList,
  updateCart,
} = require("../controllers/userControllers");

const router = require("express").Router();

router.get("/cart", verifyToken, getProductInCart);
router.get("/wishlist", verifyToken, getProductInWishList);
router.post("/addwishlist", verifyToken, addProductWishList);
router.post("/addtocart", verifyToken, addProductCart);
router.post("/updatecart", verifyToken, updateCart);
router.delete("/delwishlist/:id_item", verifyToken, removeProductWishList);
router.delete("/delcart/:id_item", verifyToken, removeProductCart);

module.exports = router;
