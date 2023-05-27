const Product = require("../models/Product");
const Order = require("../models/Order");
const Category = require("../models/Category");

const ProductControllers = {
  createProduct: async (req, res) => {
    try {
      const {
        name,
        rating,
        amount,
        description,
        colors,
        sizes,
        price,
        discount,
        imagesUrl,
        category,
      } = req.body;

      const newProduct = new Product({
        name,
        rating,
        amount,
        description,
        colors,
        sizes,
        price,
        discount,
        imagesUrl,
        category,
      });

      await newProduct.save();
      res.status(201).json({
        name: "CREATE_PRODUCT_SUCCESS",
        message: `create product ${name} successfully`,
      });
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getBasicInfoProducts: async (req, res) => {
    const { limit } = req.query;
    try {
      const minData = await Product.aggregate([
        {
          $project: {
            name: 1,
            rating: 1,
            amountRating: { $size: "$userRating" },
            price: 1,
            discount: 1,
            imagesUrl: 1,
            createdAt: 1,
          },
        },
        {
          $sample: { size: parseInt(limit) },
        },
        // {
        //   $limit: parseInt(limit),
        // },
      ]);
      res.status(200).json({ name: "GET_PRODUCTS_SUCCESS", data: minData });
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getDiscountProducts: async (req, res) => {
    const { limit } = req.query;
    try {
      const discountProducts = await Product.aggregate([
        {
          $match: { discount: { $gt: 0 } },
        },
        {
          $project: {
            name: 1,
            rating: 1,
            amountRating: { $size: "$userRating" },
            price: 1,
            discount: 1,
            imagesUrl: 1,
          },
        },
        {
          $sample: { size: parseInt(limit) },
        },
      ]);
      res
        .status(200)
        .json({ name: "GET_PRODUCTS_SUCCESS", data: discountProducts });
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
  getBestSellerProduct: async (req, res) => {
    const { limit } = req.query;
    try {
      const currentMonth = new Date();
      currentMonth.setDate(2);
      currentMonth.setHours(0, 0, 0, 0);

      const bestsellProd = await Order.aggregate([
        { $match: { createdAt: { $gte: currentMonth } } },
        { $group: { _id: "$id_product", totalSold: { $sum: "$amount" } } },
        { $sort: { totalSold: -1 } },
        { $limit: parseInt(limit) },
        { $project: { _id: 1 } },
      ]);

      const idProdList = bestsellProd.map((item) => item._id);

      const bestSellerList = await Product.find(
        { _id: { $in: idProdList } },
        {
          name: 1,
          rating: 1,
          amountRating: { $size: "$userRating" },
          price: 1,
          discount: 1,
          imagesUrl: 1,
        }
      );
      res
        .status(200)
        .json({ name: "GET_PRODUCTS_SUCCESS", data: bestSellerList });
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
  getInfoProduct: async (req, res) => {
    try {
      const { id } = req.params;
      const product = await Product.findOne({ _id: id });
      if (product)
        return res
          .status(200)
          .json({ name: "GET_PRODUCT_SUCCESS", data: product });
      else
        return res
          .status(404)
          .json({ name: "GET_PRODUCT_FAIL", message: "no product found" });
    } catch (error) {
      res.json(500).json(error);
    }
  },
  updateDiscount: async (req, res) => {
    try {
      const { id } = req.params;
      const { discount } = req.body;
      if (!discount)
        return res.status(400).json({
          name: "REQUIRED_FIELD",
          message: "required discount field in body",
        });
      const updatedProduct = await Product.findOneAndUpdate(
        { _id: id },
        { discount },
        { new: true }
      );
      res.status(200).json({
        name: "UPDATE_SUCCESS",
        message: `update discount for ${id} ${updatedProduct.name} to ${updatedProduct.discount}`,
      });
    } catch (error) {}
  },
  findProductMatching: async (req, res) => {
    try {
      const { search } = req.body;

      const result = await Product.aggregate([
        {
          $project: {
            name: 1,
            rating: 1,
            amountRating: { $size: "$userRating" },
            price: 1,
            discount: 1,
            imagesUrl: 1,
          },
        },
        {
          $match: { name: { $regex: `${search}`, $options: "i" } },
        },
        {
          $limit: 10,
        },
      ]);
      res.status(200).json({ name: "FIND_SUCCESS", data: result });
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getProductbyCategory: async (req, res) => {
    try {
      const { categoryid } = req.query;

      const existCategory = await Category.findOne({ _id: categoryid });
      if (existCategory) {
        const data = await Product.find(
          { category: categoryid },
          {
            name: 1,
            rating: 1,
            amountRating: { $size: "$userRating" },
            price: 1,
            discount: 1,
            imagesUrl: 1,
            createdAt: 1,
          }
        );
        res.status(200).json({ name: "FIND_BY_CATEGORY_SUCCESS", data });
      } else {
        res.status(200).json({
          name: "FIND_BY_CATEGORY_FAIL",
          message: "no category found",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
};

module.exports = ProductControllers;
