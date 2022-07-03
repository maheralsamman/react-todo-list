import React from "react";

const Todo = ({ todo, deleteTodo, changeTocomplete }) => {
    const { title, description, time, id, completed } = todo;
    return (
        <article
            onClick={() => changeTocomplete(id)}
            className={
                completed
                    ? "todo__item todo--completed todo--toggle-completed"
                    : "todo__item todo--toggle-completed"
            }
        >
            <h3 className="todo__title">{title}</h3>
            <p className="todo__text">{description}</p>
            <p className="todo__time">{new Date(time).toLocaleString()}</p>
            {completed ? (
                <button
                    onClick={(e) => deleteTodo(e, id)}
                    className="todo__button--remove"
                >
                    Remove
                </button>
            ) : (
                ""
            )}
        </article>
    );
};

export default Todo;
