const db = require("../models/index");
const ApiError = require("../utils/ApiError");
const Pagination = require("../utils/pagination");

const createNewUser = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      address,
      password,
      roleId,
      isDeleted,
    } = req.body;
    const avatar = req.file;
    const newStation = await db.User.create({
      firstName,
      lastName,
      email,
      phone,
      address,
      password,
      avatar: avatar.buffer,
      roleId,
      isDeleted,
    });
    res.status(201).send({ success: true });
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteUser = async (req, res) => {};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      firstName,
      lastName,
      email,
      phone,
      address,
      password,
      avatar,
      roleId,
      isDeleted,
    } = req.body;
    await db.User.update(
      {
        firstName,
        lastName,
        email,
        phone,
        address,
        password,
        avatar,
        roleId,
        isDeleted,
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

const getAllUser = async (req, res) => {
  try {
    const { page, limit } = req.query;
    const user = await Pagination(db.User, page, limit);
    // const data = {
    //   ...user,
    //   data: await Promise.all(
    //     user.data.map(async (val) => {
    //       const count = await db.User.count({
    //         where: { userId: val.id },
    //       });
    //       return {
    //         id: val.id,
    //         IdentifierCode: val.Phone ? `P${val.Phone}` : `P0000000000`,
    //         Phone: val.Phone,
    //         Email: val.Email,
    //         NumberOfBooking: count,
    //         CreationTime: val.CreationTime,
    //         LastModificationTime: val.LastModificationTime,
    //         IsDeleted: val.IsDeleted,
    //       };
    //     })
    //   ),
    // };
    res.status(200).json(user);
    // res.status(200).json(user);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await db.User.findByPk(id);
    if (!user) {
      throw new ApiError(404, "User not found!");
    }
    // const count = await db.User.count({
    //   where: { : id },
    // });
    // const data = {
    //   id: user.id,
    //   firstName: user.firstName,
    //   lastName: user.lastName,
    //   email: user.email,
    //   phone: user.phone,
    //   address: user.address,
    //   password: user.password,
    //   avatar: user.avatar,
    //   roleId: user.roleId,
    //   isDeleted: user.isDeleted,
    // };
    res.status(200).json(user);
  } catch (error) {
    res.status(500).send(error);
  }
};

const filterUsers = async (req, res) => {};

module.exports = {
  createNewUser,
  getAllUser,
  getUserById,
  filterUsers,
  updateUser,
  deleteUser,
};