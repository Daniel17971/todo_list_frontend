import { useEffect, useState } from "react";
import { deleteTodo, getTodos, patchTodo, postTodo } from "./api/api.js";
import "./App.css";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  useEffect(() => {
    getTodos().then((data) => {
      setTodoList(data);
    });
  }, [setTodoList]);
  const handleChange = (index, item) => {
    setTodoList((list) => {
      list[index]["completed"] = !list[index]["completed"];
      return [...list];
    });
    patchTodo(item["id"], {
      task_name: item["task_name"],
      completed: !item["completed"],
    });
  };
  const handleClearTodos = () => {
    setTodoList((currentList) => {
      const newList = currentList.filter((item) => {
        console.log(item["completed"]);
        return !item["completed"];
      });
      todoList.forEach((item) => {
        if (item["completed"]) {
          deleteTodo(item["id"]);
        }
      });

      return newList;
    });
  };
  const handleSubmit = (e) => {
    setTodoList((currentList) => {
      return [...currentList, { task_name: newTodo, completed: false }];
    });

    postTodo({ task_name: newTodo, completed: false });
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
              {item.task_name}
              <input
                {...(item.completed ? { checked: true } : {})}
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
