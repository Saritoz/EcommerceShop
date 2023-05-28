const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieparser = require("cookie-parser");

const authRouter = require("./routes/auth");
const categoryRouter = require("./routes/category");
const productRouter = require("./routes/product");
const userRouter = require("./routes/user");

dotenv.config();
const app = express();
const PORT = 7777;

mongoose.connect(process.env.DB_URL).then(() => console.log("connected to DB"));

app.use(
  cors({
    origin: "https://exclusive-shop-jet.vercel.app",
    credentials: true,
  })
);
app.use(cookieparser());
app.use(express.json());

app.use("/v1/auth", authRouter);
app.use("/v1/categories", categoryRouter);
app.use("/v1/products", productRouter);
app.use("/v1/user", userRouter);

app.listen(PORT, () =>
  console.log(`server is starting at port ${PORT}, press Ctrl + C to terminal`)
);
