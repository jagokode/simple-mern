const TodoList = ({ todo, todoCompleted, todoDeleted }) => {
  return (
    <div className={"todo" + (todo.complete ? " is-complete" : "")}>
      <div className="checkbox" onClick={() => todoCompleted(todo._id)}></div>
      <div className="text">{todo.title}</div>
      <div className="delete-todo" onClick={() => todoDeleted(todo._id)}>
        x
      </div>
    </div>
  );
};

export default TodoList;
