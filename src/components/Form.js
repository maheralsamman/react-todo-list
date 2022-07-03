import React, { useState, useRef, useEffect } from "react";
import "../App.css";

const Form = ({ addTodo }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const titleInputElement = useRef();
    const descriptionInputElement = useRef();

    const focusInput = () => {
        titleInputElement.current.focus();
    };

    const handleChange = (e) => {
        let value = e.target.value;
        let name = e.target.name;
        setTitle((prev) => (name === "title" ? value : prev));
        setDescription((prev) => (name === "description" ? value : prev));

        titleInputElement.current.className = "form__titleInput";
    };

    useEffect(() => {
        focusInput();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title) {
            titleInputElement.current.className = "form__titleInput--danger";
            return null;
        }

        const id = Math.floor(Math.random() * 10000);
        const time = Date.now();
        const completed = false;
        
        addTodo({ title, description, id, time, completed });

        titleInputElement.current.value = "";
        descriptionInputElement.current.value = "";
        setTitle("");
        setDescription("");
    };

    return (
        <section className="section">
            <h1 className="section__title">Register New ToDo</h1>
            <form className="form" onSubmit={handleSubmit} action="">
                <label className="form__titleLabel" htmlFor="title">
                    Title
                </label>
                <input
                    id="txtTodoItemToAdd"
                    ref={titleInputElement}
                    name="title"
                    type="text"
                    className="form__titleInput"
                    value={title}
                    onChange={handleChange}
                />
                <label className="form__descriptionLabel" htmlFor="description">
                    Description
                </label>
                <input
                    className="form__descriptionInput"
                    ref={descriptionInputElement}
                    name="description"
                    type="text"
                    value={description}
                    onChange={handleChange}
                />
                <button id="btnAddTodo" className="form__submit" onClick={handleSubmit}>
                    Add a todo
                </button>
            </form>
        </section>
    );
};

export default Form;
