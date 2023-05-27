const {
  registerUSer,
  loginUser,
  logoutUser,
  refreshAccessToken,
} = require("../controllers/authControllers");
const { verifyToken } = require("../controllers/middlewareControllers");

const router = require("express").Router();

router.post("/register", registerUSer);
router.post("/login", loginUser);
router.post("/logout", verifyToken, logoutUser);
router.post("/refresh", refreshAccessToken);

module.exports = router;
