import React, { useState, useEffect } from "react";
import "./reset.css";
import "./App.css";
import Form from "./components/Form";
import Todos from "./components/Todos";

function App() {
  const [todos, setTodos] = useState([]);
//get items from local storage
  const localStorageGet = () => 
  window.localStorage.getItem("todos");

  const localStorageSet = (state) =>
    window.localStorage.setItem("todos", JSON.stringify(state));

  const addTodo = (todo) => {
    const prevTodos = localStorageGet();
    const state = !prevTodos ? [todo] : [...JSON.parse(prevTodos), todo];
    setTodos(state);
    localStorageSet(state);
    return null;
  };

  useEffect(() => {
    const getTodos = () => {
      const prevState = localStorageGet();
      if (!prevState) {
        return;
      }
      setTodos(
        localStorageGet() ? Array.from(JSON.parse(localStorageGet())) : []
      );
    };
    getTodos();
  }, []);

  const deleteTodo = (e, id) => {
    e.stopPropagation();
    const updatedArr = [...todos].filter((todo) => todo.id !== id);
    setTodos(updatedArr);
    localStorageSet(updatedArr);
  };

  const changeTocomplete = (id) => {
    const updatedArr = todos;
    updatedArr.forEach((todo) => {
      const completeTodo = todo;
      if (completeTodo.id === id) {
        completeTodo.completed = !completeTodo.completed;
        updatedArr.splice(updatedArr.indexOf(completeTodo), 1, completeTodo);
      }
      setTodos([...updatedArr]);
      localStorageSet(updatedArr);
    });
  };

  return (
    <div className="app">
      <h1 className="app__title">My React Todo App</h1>
      <Form addTodo={addTodo} />
      <Todos
        todos={todos}
        deleteTodo={deleteTodo}
        changeTocomplete={changeTocomplete}
      />
    </div>
  );
}
export default App;
