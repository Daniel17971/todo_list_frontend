import axios from "axios";

const todoApi = axios.create({
  baseURL: "http://127.0.0.1:9090",
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getTodos = () => {
  return todoApi.get("/todos").then((res) => res.data);
};

export const postTodo = (todo) => {
  todoApi.post("/todos", todo).then((res) => console.log(res));
};

export const patchTodo = (id, todo) => {
  return todoApi.patch(`/todos/${id}`, todo).then((res) => res.data);
};

export const deleteTodo = (id) => {
  return todoApi.delete(`/todos/${id}`).then((res) => res.data);
};
