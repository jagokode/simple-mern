import { useState, useEffect } from "react";
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";
import {
  getAllTodos,
  completeTodo,
  deleteTodo,
  addTodo,
} from "./services/todo";

function App() {
  const [todos, setTodos] = useState([]);
  const [popupActive, setPopupActive] = useState(false);
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (!todos) {
      getAllTodos()
        .then((data) => setTodos(data))
        .catch((error) => console.log(error));
    }
  }, []);

  const todoAdd = () => {
    addTodo(title)
      .then((data) => {
        setTodos([...todos, data]);
        setPopupActive(false);
        setTitle("");
      })
      .catch((error) => console.log(error));
  };

  const todoCompleted = (id) => {
    completeTodo(id)
      .then((data) => {
        setTodos((todos) =>
          todos.map((todo) => {
            if (todo._id === data._id) {
              todo.complete = data.complete;
            }
            return todo;
          })
        );
      })
      .catch((error) => console.log(error));
  };

  const todoDeleted = (id) => {
    deleteTodo(id)
      .then((data) => {
        setTodos((todos) => todos.filter((todo) => todo._id !== data._id));
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="App">
      <h1>Selamat Datang, Jago</h1>
      <h4>Kegiatanmu</h4>
      <div className="todos">
        {todos.length !== 0 ? (
          todos.map((todo) => (
            <TodoList
              key={todo._id}
              todo={todo}
              todoCompleted={todoCompleted}
              todoDeleted={todoDeleted}
            />
          ))
        ) : (
          <p>Anda tidak punya rencana kegiatan.</p>
        )}
      </div>
      <div className="addPopup" onClick={() => setPopupActive(true)}>
        +
      </div>
      {popupActive ? (
        <AddTodo
          title={title}
          setTitle={setTitle}
          setPopupActive={setPopupActive}
          todoAdd={todoAdd}
        />
      ) : (
        ""
      )}
    </div>
  );
}

export default App;
