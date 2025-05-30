import { useEffect, useState } from "react"

import BACKEND_URL from "../config/config"
import AddTodo from "./AddTodo"
import TodoItem from "./TodoItem"

const TodoList = () =>{
    const [todos, setTodos] = useState([]);

    useEffect(()=>{
        fetchTodos();
    }, [])

    const fetchTodos = async () =>{
        try {
            const response = await fetch(`${BACKEND_URL}/get-todos`)
            const data = await response.json()
            setTodos(data)
        } catch (error) {
            console.error("Error fetching the data", error)
        }
    }

    const addTodo = async (title) =>{
        console.log("Adding todo", title)
        try {
            const response = await fetch(`${BACKEND_URL}/add-todo`,{
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({title})
            })
            console.log("response is", response)
            const newTodo = await response.json();
            setTodos((prev)=> [...prev, newTodo])
            console.log("Response received", response)
        } catch (error) {
            console.error("Error while creating the todo", error)
        }
    }

const deleteTodo = async (id) => {
  try {
      console.log("Deleting todo with id:", id); // <-- use id directly

      const response = await fetch(`${BACKEND_URL}/delete-todo/${id}`, {
          method: "DELETE"
      });

      if (!response.ok) {
          throw new Error(`Failed to delete todo with status ${response.status}`);
      }

      setTodos((prev) => prev.filter((todo) => todo._id !== id));
  } catch (error) {
      console.error("Error deleting todo", error);
  }
};

const completeTodo = async (id, completed) => {
    try {
        console.log("Updating todo at :", `${BACKEND_URL}/update-todo/${id}`);
        const response = await fetch(`${BACKEND_URL}/update-todo/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ completed })
        });

        console.log("Updating todo at:", `${BACKEND_URL}/update-todo/${id}`);

        if (!response.ok) {
            throw new Error(`Failed to update: ${response.status}`);
        }

        const updated = await response.json();
        setTodos((prev) =>
            prev.map((todo) =>
                todo._id === updated._id ? updated : todo
            )
        );
    } catch (error) {
        console.error("Error updating todo", error);
    }
};

    // const deleteTodo = async (title) =>{
    //     console.log("Adding todo", title)
    //     try {
    //         const response = await fetch(`${BACKEND_URL}/add-todo`,{
    //             method: "POST",
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify({title})
    //         })
    //         console.log("response is", response)
    //         const newTodo = await response.json();
    //         setTodos((prev)=> [...prev, newTodo])
    //         console.log("Response received", response)
    //     } catch (error) {
    //         console.error("Error while creating the todo", error)
    //     }
    // }
    

   return (
    <div>
        <h1> Todo List </h1>
        <AddTodo onAdd={addTodo} />
        <ul>
            {
                todos.map(todo => (
                    <TodoItem
                        key={todo._id}
                        todo={todo}
                        onDelete={deleteTodo}
                        onComplete={completeTodo}
                    />
                ))
            }
        </ul>
    </div>
);


}

export default TodoList