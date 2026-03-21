const data = require("../data/sample.json");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const path = require("path");
const AppError = require("../utils/AppError");

const dataPath = path.join(__dirname, "../data/sample.json");
const writeToFile = (data) => {
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 4));
};

const getUsers = (search, sort, order) => {
    //we are assuming that user will search by name
    let users = data.filter((user) => {
        if (user.name.toLowerCase().includes(search.toLowerCase())) return true;
        else return false;
    });

    if (sort) {
        users.sort((a, b) => {
            if (order == "desc") {
                return a[sort] < b[sort] ? 1 : -1;
            } else {
                return a[sort] > b[sort] ? 1 : -1;
            }
        });
    }
    return users;
};

const getUser = (id) => {
    const index = data.findIndex((user) => user.id === id);
    if (index === -1) return null;

    return data[index];
};

const createUser = ({ name, email, password, phone }) => {
    const id = uuidv4();
    const newUser = {
        id,
        name,
        email,
        password,
        phone,
    };
    data.push(newUser);
    writeToFile(data);

    return newUser;
};

const updateUser = (id, updateData) => {
    const index = data.findIndex((user) => user.id === id);
    if (index === -1) {
        throw new AppError("User not found", 404);
    }

    data[index] = { ...data[index], ...updateData };
    writeToFile(data);
    return data[index];
};

const deleteUser = (id) => {
    const index = data.findIndex((user) => user.id === id);
    if (index === -1) {
        throw new AppError("User not found", 404);
    }
    data.splice(index, 1);
    writeToFile(data);
};

module.exports = { getUsers, getUser, createUser, updateUser, deleteUser };
