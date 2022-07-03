import React from "react";
import Todo from "./Todo";
import "../App.css";

const Todos = ({ todos, deleteTodo, changeTocomplete }) => {
    return (
        <main id="todoList" className="main">
            {todos.map((todo) => {
                return (
                    <Todo
                        key={todo.id}
                        todo={todo}
                        deleteTodo={deleteTodo}
                        changeTocomplete={changeTocomplete}
                    />
                );
            })}
        </main>
    );
};

export default Todos;
