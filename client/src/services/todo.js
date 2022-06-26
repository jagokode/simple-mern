import axios from "axios";

export const addTodo = async (title) => {
  const response = await axios.post(`${import.meta.env.VITE_API}/api/todo`, {
    title,
  });

  const {
    data: { data },
  } = response;

  if (response.statusText === "OK") return data;
};

export const getAllTodos = async () => {
  const response = await axios.get(`${import.meta.env.VITE_API}/api/todo`);

  const {
    data: { data },
  } = response;

  if (response.statusText === "OK") return data;
};

export const completeTodo = async (id) => {
  const response = await axios.get(
    `${import.meta.env.VITE_API}/api/todo/${id}`
  );

  const {
    data: { data },
  } = response;

  if (response.statusText === "OK") {
    return data;
  }
};

export const deleteTodo = async (id) => {
  const response = await axios.delete(
    `${import.meta.env.VITE_API}/api/todo/${id}`
  );

  const {
    data: { data },
  } = response;

  if (response.statusText === "OK") {
    return data;
  }
};
