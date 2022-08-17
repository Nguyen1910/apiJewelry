const express = require("express");
const db = require("../models/index");
const { router: userRouter } = require("./userRouter");
const { router: brandRouter } = require("./brandRouter");
const { router: categoryRouter } = require("./categoryRouter");
const { router: orderRouter } = require("./orderRouter");
const { router: orderDetailRouter } = require("./orderDetailRouter");
const { router: productRouter } = require("./productRouter");
const { router: deliveryRouter } = require("./deliveryRouter");
const { router: allCodeRouter } = require("./allCodeRouter");
const { ImgList, convertImagesInProduct } = require("../utils/ImgList");

let rootRouter = express.Router();

const api_version = "/api/v1";

let initWebRoutes = (app) => {
  rootRouter.use("/user", userRouter);
  rootRouter.use("/brand", brandRouter);
  rootRouter.use("/category", categoryRouter);
  rootRouter.use("/order", orderRouter);
  rootRouter.use("/orderDetail", orderDetailRouter);
  rootRouter.use("/product", productRouter);
  rootRouter.use("/delivery", deliveryRouter);
  rootRouter.use("/allCode", allCodeRouter);

  rootRouter.get("/image/user/:userId", async (req, res) => {
    try {
      const data = await db.User.findByPk(req.params.userId);
      console.log(data);
      if (!data) {
        res.status(404).send("Image not found");
      }
      if (data.avatar === null) {
        // const defaut = fs.readFileSync("./default/default.png");
        // return res.send(Buffer.from(defaut));
      }
      res.status(200).send(Buffer.from(data.avatar));
    } catch (error) {}
  });
  rootRouter.get("/image/product/:productId/:index", async (req, res) => {
    try {
      const { productId, index } = req.params;
      const product = await db.Product.findByPk(productId);
      if (!product) {
        throw new ApiError(404, "Product not found!");
      }
      const image = convertImagesInProduct([{ ...product.dataValues }])[0]
        .image[index];
      res.status(200).send(image);
    } catch (error) {
      res.status(500).send(error);
    }
  });

  return app.use("/", rootRouter);
};

module.exports = initWebRoutes;
