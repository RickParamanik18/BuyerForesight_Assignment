const userService = require("../services/user.service");

const getUsers = (req, res) => {
    const { search, sort, order } = req.query;
    const users = userService.getUsers(search, sort, order);
    res.status(200).json({
        success: true,
        data: users,
    });
};

const getUser = (req, res) => {
    const { id } = req.params;
    const user = userService.getUser(id);
    res.status(200).json({
        success: true,
        data: user,
    });
};

const createUser = (req, res) => {
    const { name, email, password, phone } = req.body;
    const user = userService.createUser({ name, email, password, phone });
    res.status(200).json({
        success: true,
        data: user,
    });
};

const updateUser = (req, res) => {
    const { id } = req.params;
    const updateData = {};
    const userFields = ["name", "email", "password", "phone"];
    userFields.forEach((field) => {
        if (req.body[field]) updateData[field] = req.body[field];
    });

    const user = userService.updateUser(id, updateData);
    res.status(200).json({
        success: true,
        data: user,
    });
};

const deleteUser = (req, res) => {
    const { id } = req.params;
    const deleted = userService.deleteUser(id);
    if (!deleted) {
        return res.status(404).json({
            success: false,
            message: "User not found",
        });
    } else {
        res.status(200).json({
            success: true,
            message: "User deleted successfully",
        });
    }
};

module.exports = { getUser, getUsers, createUser, updateUser, deleteUser };
