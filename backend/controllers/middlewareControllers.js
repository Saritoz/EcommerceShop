const jwt = require("jsonwebtoken");

const middlewareControllers = {
  // verify token first
  verifyToken: (req, res, next) => {
    // get token from header
    const token = req.headers.authorization;
    if (token) {
      // token format "Bearer [accesstoken]" split and verify
      const accessToken = token.split(" ")[1];
      jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, data) => {
        if (err)
          res
            .status(401)
            .json({ name: "EXPRIED_TOKEN", message: "invalid token" });
        else {
          req.user = data;
          next();
        }
      });
    } else {
      res
        .status(401)
        .json({ name: "INVALID_TOKEN", message: "authentication first" });
    }
  },

  // verify token and auth privilege
  verifyTokenAndAuth: (req, res, next) => {
    // use verifytoken to get data from headers.authorization and compare to data send by client
    middlewareControllers.verifyToken(req, res, () => {
      if (req.user.id === req.params.id || req.user.privilege === "admin") {
        next();
      } else {
        res
          .status(403)
          .json({
            name: "REQUIRED_PERMISSION",
            message: "Required permission to do this action",
          });
      }
    });
  },
};

module.exports = middlewareControllers;
