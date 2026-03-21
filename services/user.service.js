const data = require("../data/sample.json");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const path = require("path");

const dataPath = path.join(__dirname, "../data/sample.json");

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
    let user = data.filter((user) => {
        if (user.id == id) return true;
        else return false;
    });

    return user;
};

const createUser = ({ name, email, password, phone }) => {
    const id = uuidv4();
    if (!name || !email || !password || !phone) return null;
    const newUser = {
        id,
        name,
        email,
        password,
        phone,
    };
    data.push(newUser);
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));

    return newUser;
};

module.exports = { getUsers, getUser, createUser };
