const User = require("../models/User");
const Product = require("../models/Product");

const userControllers = {
  addProductWishList: async (req, res) => {
    try {
      const { id } = req.user;
      const { id_product } = req.body;
      if (!id_product)
        return res.status(400).json({
          name: "REQUIRED_FIELD",
          message: "required id_product field in body",
        });
      const existProduct = Product.findOne({ _id: id_product });
      if (!existProduct)
        return res.status(404).json({
          name: "NO_PRODUCT_FOUND",
          message: "no product found to add wishlist",
        });

      const updateWishLish = await User.findOneAndUpdate(
        { _id: id },
        { $addToSet: { wishList: id_product } },
        { new: true }
      ).select("wishList");

      res
        .status(200)
        .json({
          name: "ADD_WISHLIST_SUCCESS",
          data: updateWishLish,
          message: "add wishlist success",
        });
    } catch (error) {
      res.status(500).json(error);
    }
  },
  addProductCart: async (req, res) => {
    try {
      const { id } = req.user;
      const { id_product, amount, size, color } = req.body;
      let updateCart;
      if (!id_product)
        return res.status(400).json({
          name: "REQUIRED_FIELD",
          message: "required id_product field in body",
        });
      const existInCart = await User.findOne({
        _id: id,
        "cart.id": id_product,
      });

      if (existInCart) {
        updateCart = await User.findOneAndUpdate(
          { _id: id, "cart.id": id_product },
          { $inc: { "cart.$.amount": amount ? amount : 1 } },
          { new: true }
        ).select("cart");
      } else {
        updateCart = await User.findOneAndUpdate(
          { _id: id },
          { $push: { cart: { id: id_product, amount, color, size } } },
          { new: true }
        ).select("cart");
      }

      res
        .status(200)
        .json({
          name: "ADD_CART_SUCCESS",
          data: updateCart,
          message: "add cart success",
        });
    } catch (error) {
      res.status(500).json(error);
    }
  },
  removeProductCart: async (req, res) => {
    try {
      const { id } = req.user;
      const { id_item } = req.params;

      const updateCart = await User.findOneAndUpdate(
        { _id: id },
        {
          $pull: { cart: { _id: id_item } },
        },
        { new: true }
      ).select("cart");

      res
        .status(200)
        .json({
          name: "DELETE_CART_SUCCESS",
          data: updateCart,
          message: "remove success",
        });
    } catch (error) {
      res.status(500).json(error);
    }
  },
  removeProductWishList: async (req, res) => {
    try {
      const { id } = req.user;
      const { id_item } = req.params;

      const updateCart = await User.findOneAndUpdate(
        { _id: id },
        {
          $pull: { wishList: id_item },
        },
        { new: true }
      ).select("wishList");

      res
        .status(200)
        .json({
          name: "DELETE_WISHLIST_SUCCESS",
          data: updateCart,
          message: "remove success",
        });
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getProductInCart: async (req, res) => {
    try {
      const { id } = req.user;
      const data = await User.findOne({ _id: id })
        .populate({
          path: "cart.id",
          select: "name imagesUrl price discount",
          model: "Products",
        })
        .select("cart");
      res.status(200).json({ name: "GET_CART_SUCCESS", data });
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
  getProductInWishList: async (req, res) => {
    try {
      const { id } = req.user;
      const data = await User.findOne({ _id: id })
        .populate({
          path: "wishList",
          select: "name imagesUrl price rating userRating discount createdAt",
          model: "Products",
        })
        .select("wishList");

      const newData = data.wishList.map((item) => {
        const {
          userRating,
          name,
          imagesUrl,
          price,
          _id,
          rating,
          discount,
          createdAt,
        } = item;

        return {
          _id,
          name,
          rating,
          amountRating: userRating.length,
          price,
          discount,
          imagesUrl,
          createdAt,
        };
      });
      res.status(200).json({ name: "GET_WISHLIST_SUCCESS", data: newData });
    } catch (error) {
      res.status(500).json(error);
    }
  },

  updateCart: async (req, res) => {
    try {
      const { id } = req.user;
      const { items } = req.body;

      for (let i = 0; i < items.length; i++) {
        await User.findOneAndUpdate(
          { _id: id, "cart._id": items[i].id },
          { $set: { "cart.$.amount": items[i].amount } }
        );
      }

      const newCart = await User.findOne({ _id: id }).select("cart");
      res
        .status(200)
        .json({
          name: "UPDATE_CART_SUCCESS",
          data: newCart,
          message: "update success",
        });
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = userControllers;
