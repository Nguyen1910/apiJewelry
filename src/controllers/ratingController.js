const db = require("../models/index");
const { QueryTypes } = require("sequelize");
const ApiError = require("../utils/ApiError");
const Pagination = require("../utils/Pagination");
const { sequelize } = require("../models/index");

const createNewRating = async (req, res) => {
  try {
    const { productId, userId, comment, rate } = req.body;
    const newStation = await db.Rating.create({
      productId,
      userId,
      comment,
      rate,
    });
    res.status(201).send(newStation);
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteRating = async (req, res) => {
  try {
    const { id } = req.params;
    const Rating = await db.Rating.findByPk(id);
    if (Rating) {
      db.RatingDetails.destroy({
        where: {
          RatingId: id,
        },
      });
      db.Rating.destroy({
        where: {
          id,
        },
      });
      res.status(200).send(Rating);
    } else {
      res.status(404).send("not found");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateRating = async (req, res) => {
  try {
    const { productId, userId } = req.params;
    const { comment, rate } = req.body;
    await db.Rating.update(
      {
        comment,
        rate,
      },
      {
        where: {
          productId,
          userId,
        },
      }
    );
    res.status(200).json({
      success: true,
      message: "Update success",
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const getAllRating = async (req, res) => {
  try {
    const { productId } = req.query;

    // const Rating = await Pagination(db.Rating, page, limit, {
    //   productId,
    // });
    // const Rating = await db.Rating.findAll({
    //   where: { productId },
    //   include: [{ model: User, require: true }],
    // });

    const Rating = await sequelize.query(
      "SELECT ratings.id, ratings.productId, ratings.userId, ratings.comment, ratings.rate, ratings.createdAt , users.firstName, users.lastName  FROM ratings INNER JOIN  users ON users.id = ratings.userId",
      {
        type: QueryTypes.SELECT,
      }
    );
    res.status(200).json(Rating);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getRatingById = async (req, res) => {
  try {
    const { productId } = req.params;
    const Rating = await sequelize.query(
      "SELECT ratings.id, ratings.productId, ratings.userId, ratings.comment, ratings.rate, ratings.createdAt , users.firstName, users.lastName  FROM ratings INNER JOIN  users ON users.id = ratings.userId WHERE productId = :productId",
      {
        replacements: { productId: productId },
        type: QueryTypes.SELECT,
      }
    );
    if (!Rating) {
      throw new ApiError(404, "Rating not found!");
    }
    res.status(200).json(Rating);
  } catch (error) {
    res.status(500).send(error);
  }
};

// const getRatingById = async (req, res) => {
//   try {
//     const { userId, productId } = req.params;
//     const rating = await db.Rating.findAll({
//       where: { userId, productId },
//     });
//     if (!rating) {
//       throw new ApiError(404, "Rating not found!");
//     }
//     res.status(200).json(rating);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// };

const filterRatings = async (req, res) => {};

module.exports = {
  createNewRating,
  getAllRating,
  getRatingById,
  filterRatings,
  updateRating,
  deleteRating,
};
