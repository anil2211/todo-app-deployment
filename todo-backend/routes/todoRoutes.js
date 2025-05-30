const express = require("express")
const { getTodos, addTodo, deleteTodo, updateTodo } = require("../controllers/todoController")

const router = express.Router()

router.get("/get-todos", getTodos)
router.post("/add-todo", addTodo)
router.delete("/delete-todo/id", deleteTodo)
router.put("/update-todo/id", updateTodo)


// router.post("/update-todo",updateTodo)

// Todo: Implement the logic for handling deletion of todos
// router.delete("/:id",)

module.exports = router;