



const express = require("express");
const fs = require("fs");
const app = express();
app.use(express.json());

// Read users from the database
const readUsersFromDB = () => JSON.parse(fs.readFileSync("./db.json", "utf-8"));

// Write users to the database
const writeUsersToDB = (data) => fs.writeFileSync("./db.json", JSON.stringify(data));

// Get all users
app.get("/home", (req, res) => {
    const data = readUsersFromDB();
    console.log(data.users);
    res.send(data.users);
});

// Sign up a new user
app.post("/signup", (req, res) => {
    const data = readUsersFromDB();
    console.log(data);

    let reqdata = req.body;
    let flag = false;
    data.users.forEach((el) => {
        if (el.name === reqdata.name) {
            flag = true;
            res.send("user already registered");
        }
    });
    if (!flag) {
        data.users.push(reqdata);
        writeUsersToDB(data);
        res.send("signup successful");
    }
});

// Update user data (PUT)
app.put("/update", (req, res) => {
    const data = readUsersFromDB();
    let reqdata = req.body;
    let flag = false;
    data.users.forEach((el, i) => {
        if (el.email === reqdata.email) {
            flag = true;
            data.users[i] = reqdata; // Replace the entire user object
            writeUsersToDB(data);
            res.send("data updated successful");
        }
    });
    if (!flag) {
        res.send("user not found to update");
    }
});

// Partially update user data (PATCH)
app.patch("/update", (req, res) => {
    const data = readUsersFromDB();
    let reqdata = req.body;
    let flag = false;
    data.users.forEach((el, i) => {
        if (el.email === reqdata.email) {
            flag = true;
            data.users[i] = { ...el, ...reqdata }; // Merge existing user data with new data
            writeUsersToDB(data);
            res.send("data partially updated successful");
        }
    });
    if (!flag) {
        res.send("user not found to update");
    }
});

// Delete a user
app.delete("/delete", (req, res) => {
    const data = readUsersFromDB();
    let reqdata = req.body;
    let flag = false;
    const initialLength = data.users.length;
    data.users = data.users.filter(el => el.email !== reqdata.email);
    if (data.users.length < initialLength) {
        flag = true;
        writeUsersToDB(data);
        res.send("user deleted successful");
    }
    if (!flag) {
        res.send("user not found to delete");
    }
});

app.listen(8181, () => {
    console.log("server started");
});
