const {
  createCategory,
  getCategories,
  updateCategorybyId,
  deleteCategorybyId,
} = require("../controllers/categoryControllers");
const { verifyTokenAndAuth } = require("../controllers/middlewareControllers");

const router = require("express").Router();

router.get("/", getCategories);
router.post("/add", verifyTokenAndAuth, createCategory);
router.put("/:id", verifyTokenAndAuth, updateCategorybyId);
router.delete("/:id", verifyTokenAndAuth, deleteCategorybyId);

module.exports = router;
