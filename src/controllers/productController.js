const db = require("../models/index");
const ApiError = require("../utils/ApiError");
const {
  convertImagesInProduct,
  convertImagesInProductList,
} = require("../utils/ImgList");
const Pagination = require("../utils/pagination");

const createNewProduct = async (req, res) => {
  try {
    const {
      name,
      price,
      description,
      discount,
      material,
      gender,
      amount,
      color,
      brandId,
      categoryId,
    } = req.body;

    let listImgProduct = [];
    req.files.map(async (val) => {
      listImgProduct = [...listImgProduct, val.buffer];
    });
    const Image = listImgProduct.reduce((acc, val, idx) => {
      const name = `image${idx + 1}`;
      return { ...acc, [name]: val };
    }, {});
    console.log(Image);
    const newStation = await db.Product.create({
      name,
      price,
      description,
      discount,
      material,
      gender,
      amount,
      color,
      brandId,
      categoryId,
      ...Image,
    });
    res.status(201).send(newStation);
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await db.Product.findByPk(id);
    if (product) {
      db.Product.destroy({
        where: {
          id,
        },
      });
      res.status(200).send(product);
    } else {
      res.status(404).send("not found");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      price,
      description,
      discount,
      material,
      gender,
      amount,
      color,
      brandId,
      categoryId,
    } = req.body;

    let listImgProduct = [];
    req.files.map(async (val) => {
      listImgProduct = [...listImgProduct, val.buffer];
    });
    const Image = listImgProduct.reduce((acc, val, idx) => {
      const name = `image${idx + 1}`;
      return { ...acc, [name]: val };
    }, {});

    await db.Product.update(
      {
        name,
        price,
        description,
        discount,
        material,
        gender,
        amount,
        color,
        brandId,
        categoryId,
        ...Image,
      },
      {
        where: {
          id,
        },
      }
    );
    res.status(200).json({
      success: true,
      message: "Update success",
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

const getAllProduct = async (req, res) => {
  try {
    const { page, limit } = req.query;
    console.log(req.query);
    const products = await Pagination(db.Product, page, limit);
    // console.log(products.data);
    const newProducts = {
      ...products,
      data: [...convertImagesInProductList([...products.data])],
    };
    res.status(200).json(newProducts);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await db.Product.findByPk(id);
    if (!product) {
      throw new ApiError(404, "Product not found!");
    }
    const newProduct = convertImagesInProduct([{ ...product.dataValues }])[0];

    res.status(200).json(newProduct);
  } catch (error) {
    res.status(500).send(error);
  }
};

const filterProduct = async (req, res) => {
  try {
    const { page, limit } = req.query;
    const where = req.body;
    Object.keys(where).forEach((key) => {
      if (where[key] === null) {
        delete where[key];
      }
    });
    const products = await Pagination(db.Product, page, limit, where);
    console.log(where);

    // console.log(products.data);
    const newProducts = {
      ...products,
      data: [...convertImagesInProductList([...products.data])],
    };
    res.status(200).json(newProducts);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  createNewProduct,
  getAllProduct,
  getProductById,
  filterProduct,
  updateProduct,
  deleteProduct,
};
