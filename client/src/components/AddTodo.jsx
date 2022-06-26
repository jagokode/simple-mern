const AddTodo = ({ title, setTitle, setPopupActive, todoAdd }) => {
  return (
    <div className="popup">
      <div className="closePopup" onClick={() => setPopupActive(false)}>
        X
      </div>
      <div className="content">
        <h3>Tambah Kegiatan</h3>
        <input
          type="text"
          className="add-todo-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="button" onClick={todoAdd}>
          Tambah
        </div>
      </div>
    </div>
  );
};

export default AddTodo;
