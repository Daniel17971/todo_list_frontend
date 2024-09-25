import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import axios from "axios";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  useEffect(() => {
    axios.get("http://localhost:3000/todos").then((res) => {
      setTodoList(res.data);
    });
  }, [setTodoList]);

  const handleChange = (index, item) => {
    setTodoList((list) => {
      list[index]["done"] = !list[index]["done"];
      return [...list];
    });
    axios.patch(`http://localhost:3000/todos/${item["id"]}`, {
      done: !item["done"],
    });
  };
  const handleClearTodos = () => {
    setTodoList((currentList) => {
      const newList = currentList.filter((item) => {
        console.log(item["done"]);
        return !item["done"];
      });
      todoList.forEach((item) => {
        if (item["done"]) {
          axios.delete(`http://localhost:3000/todos/${item["id"]}`);
        }
      });

      return newList;
    });
  };
  const handleSubmit = (e) => {
    setTodoList((currentList) => {
      return [...currentList, { title: newTodo, done: false }];
    });
    axios.post("http://localhost:3000/todos", { title: newTodo, done: false });
  };
  const handleInputChange = (e) => {
    setNewTodo(e.target.value);
  };
  return (
    <div>
      <h1>TODO List</h1>
      <ul>
        {todoList.map((item, index) => {
          return (
            <li key={item.id}>
              {item.title}
              <input
                type="checkbox"
                onChange={(e) => {
                  handleChange(index, item);
                }}
              />
            </li>
          );
        })}
      </ul>
      <button onClick={handleClearTodos}>clear completed</button>
      <h2>Add todo</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(e);
        }}
      >
        <label htmlFor="addTodo">todo : </label>
        <input
          type="text"
          name="addTodo"
          onChange={(e) => {
            handleInputChange(e);
          }}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default App;
