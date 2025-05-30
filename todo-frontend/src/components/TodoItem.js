// const TodoItem = ({ todo, onDelete, onComplete }) => {
//     return (
//         <li>
//             <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
//                 {todo.title}
//             </span>
//             <button onClick={() => onComplete(todo._id, !todo.completed)}>
//                 {todo.completed ? "Undo" : "Complete"}
//             </button>
//             <button onClick={() => onDelete(todo._id)}>Delete</button>
//         </li>
//     );
// };

// export default TodoItem;


const TodoItem = ({ todo, onDelete, onComplete }) => {
    return (
        <li>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => onComplete(todo._id)}
                />
                <span className={todo.completed ? "completed" : ""}>
                    {todo.title}
                </span>
            </div>
            <button
                className="delete-button"
                onClick={() => onDelete(todo._id)}
            >
                Delete
            </button>
        </li>
    );
};

export default TodoItem;
