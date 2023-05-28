const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

let refreshTokenStore = [];

const authControllers = {
  generateAccessToken: (user) => {
    return jwt.sign(
      {
        id: user._id || user.id,
        privilege: user.privilege,
      },
      process.env.JWT_ACCESS_KEY,
      { expiresIn: "30s" }
    );
  },

  generateRefreshToken: (user) => {
    return jwt.sign(
      {
        id: user._id,
        privilege: user.privilege,
      },
      process.env.JWT_REFRESH_KEY,
      { expiresIn: "1d" }
    );
  },

  registerUSer: async (req, res) => {
    try {
      // check if exist username
      const existUsername = await User.findOne({ username: req.body.username });
      if (existUsername) {
        return res.status(400).json({
          name: "EXISTED_USERNAME",
          message: "this username had already used",
        });
      }

      // check if exist email
      const existEmail = await User.findOne({ email: req.body.email });
      if (existEmail) {
        return res.status(400).json({
          name: "EXISTED_EMAIL",
          message: "email had already registered",
        });
      }

      // hash password
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(req.body.password, salt);

      // create user
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashed,
      });

      // save to db
      const user = await newUser.save();
      res.status(200).json({
        name: "REGISTER_SUCCESS",
        message: "register success",
        data: user,
      });
    } catch (error) {
      res.status(500).json(error);
    }
  },
  loginUser: async (req, res) => {
    try {
      const { username, password } = req.body;

      // check valid username
      const user = await User.findOne({ username });
      if (!user)
        return res
          .status(403)
          .json({ name: "LOGIN_FAIL", message: "invalid username" });

      // check valid password
      const validPass = await bcrypt.compare(password, user.password);
      if (!validPass) {
        res
          .status(400)
          .json({ name: "LOGIN_FAIL", message: "incorrect password" });
      } else {
        // generate token
        const accessToken = authControllers.generateAccessToken(user);
        const refreshToken = authControllers.generateRefreshToken(user);
        refreshTokenStore.push(refreshToken);

        // set refreshToken to cookie
        // res.cookie("refreshToken", refreshToken, {
        //   httpOnly: true,
        //   secure: false,
        //   path: "/",
        // });

        // return data expect password
        const { password, ...dataUser } = user._doc;
        res.status(200).json({
          name: "LOGIN_SUCCESS",
          message: "login success",
          data: { ...dataUser, accessToken, refreshToken },
        });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },
  logoutUser: async (req, res) => {
    //filter local store this token
    refreshTokenStore = refreshTokenStore.filter(
      (token) => req.cookies.refreshToken !== token
    );

    // clear cookies
    res.clearCookie("refreshToken");
    res.status(200).json({
      name: "LOGOUT_SUCCESS",
      message: "logout success",
    });
  },
  refreshAccessToken: async (req, res) => {
    try {
      // get refreshtoken
      const { refreshToken } = req.body;

      // check if not have refreshtoken
      if (!refreshToken)
        res
          .status(401)
          .json({ name: "REFRESH_FAIL", message: "authentication first" });
      // check local store not have this token
      else if (!refreshTokenStore.includes(refreshToken))
        res.status(401).json({
          name: "INVALID_TOKEN",
          message: "invalid refresh token, relogin...",
        });
      else {
        // check jwt
        jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, data) => {
          if (err) {
            res
              .status(500)
              .json({ message: `an error occur when verify: ${err}` });
            refreshTokenStore.filter((token) => token === refreshToken);
          } else {
            const accessToken = authControllers.generateAccessToken(data);
            res.status(200).json({ name: "REFRESH_SUCCESS", accessToken });
          }
        });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = authControllers;
