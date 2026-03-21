const userService = require("../services/user.service");
const asyncHandler = require("../utils/asyncHanlder");
const AppError = require("../utils/AppError");

const getUsers = asyncHandler(async (req, res) => {
    const { search = "", sort = "id", order = "asc" } = req.query; //by defauslt we will sort by id in ascending order
    const users = userService.getUsers(search, sort, order);
    res.status(200).json({
        success: true,
        data: users,
    });
});

const getUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const user = userService.getUser(id);
    res.status(200).json({
        success: true,
        data: user,
    });
});

const createUser = asyncHandler(async (req, res) => {
    const { name, email, password, phone } = req.body;
    if (!name || !email || !password || !phone) {
        throw new AppError("All fields are required", 400);
    }
    const user = userService.createUser({ name, email, password, phone });
    res.status(200).json({
        success: true,
        data: user,
    });
});

const updateUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const updateData = {};
    const userFields = ["name", "email", "password", "phone"];
    userFields.forEach((field) => {
        if (req.body[field]) updateData[field] = req.body[field];
    });

    if (Object.keys(updateData).length === 0) {
        throw new AppError("No fields to update", 400);
    }

    const user = userService.updateUser(id, updateData);
    res.status(200).json({
        success: true,
        data: user,
    });
});

const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    userService.deleteUser(id);

    res.status(200).json({
        success: true,
        message: "User deleted successfully",
    });
});

module.exports = { getUser, getUsers, createUser, updateUser, deleteUser };
