const Todo = require("../models/todoModel")
const logger  = require("../utils/logger")

exports.getTodos = async(req,res)=>{
    logger.info("Fetching the todos from DB")
    try {
        const todos = await Todo.find();
        logger.info(`fetched all the todos ${JSON.stringify(todos)}`)
        res.status(200).json(todos)

    } catch (error) {
        logger.error("Error while fetching the todos", error)
        res.status(500).json({message: "something went wrong, please try later"})
    }
}

exports.addTodo =  async (req,res)=>{
    try {
        const title  = req.body.title;
        console.log("Adding a new todo", req.body)
        logger.info(`Adding a new todo ${title}`)
        const newTodo = new Todo({
            title: title
        })

        logger.info("Adding the todo to DB ", newTodo)
        const savedTodo = await newTodo.save()
        logger.info("Added the todo to DB ", savedTodo)

        res.status(200).json(savedTodo)
    } catch (error) {
        logger.error("Error while Adding the todos", error)
        res.status(500).json({message: "something went wrong, please try later"})
    }
    
}

exports.deleteTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTodo = await Todo.findByIdAndDelete(id);
        if (!deletedTodo) {
            return res.status(404).json({ message: "Todo not found" });
        }
        res.status(200).json(deletedTodo);
    } catch (error) {
        res.status(500).json({ message: "Error deleting todo" });
    }
};

exports.updateTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const { completed } = req.body;
        const updatedTodo = await Todo.findByIdAndUpdate(
            id,
            { completed: completed, completedAt: completed ? Date.now() : null },
            { new: true }
        );
        if (!updatedTodo) {
            return res.status(404).json({ message: "Todo not found" });
        }
        res.status(200).json(updatedTodo);
    } catch (error) {
        res.status(500).json({ message: "Error updating todo" });
    }
};
