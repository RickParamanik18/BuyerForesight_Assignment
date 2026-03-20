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

module.exports = { getUser, getUsers };
