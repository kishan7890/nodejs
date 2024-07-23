
const express = require("express");
const fs = require("fs");
const app = express();
app.use(express.json());

// Read todos from the database
const readTodosFromDB = () => JSON.parse(fs.readFileSync("./db.json", "utf-8"));

// Write todos to the database
const writeTodosToDB = (data) => fs.writeFileSync("./db.json", JSON.stringify(data));

// Get all todos
app.get("/todos", (req, res) => {
    const data = readTodosFromDB();
    res.send(data.todos);
});

// Add a new todo
app.post("/todos", (req, res) => {
    const data = readTodosFromDB();
    const newTodo = req.body;
    data.todos.push(newTodo);
    writeTodosToDB(data);
    res.send("New todo added successfully");
});

// Update the status of all todos with even ID from false to true
app.put("/todos/update-status", (req, res) => {
    const data = readTodosFromDB();
    data.todos.forEach(todo => {
        if (todo.id % 2 === 0 && todo.status === false) {
            todo.status = true;
        }
    });
    writeTodosToDB(data);
    res.send("Status of todos with even IDs updated successfully");
});

// Delete all todos whose status is true
app.delete("/todos/delete-true", (req, res) => {
    let data = readTodosFromDB();
    data.todos = data.todos.filter(todo => todo.status !== true);
    writeTodosToDB(data);
    res.send("Todos with status true deleted successfully");
});

app.listen(8181, () => {
    console.log("server started on port 8181");
});

