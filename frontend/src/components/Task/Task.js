import "./Task.css";

function Task({ task, handleCompleteTask, handleDeleteTask }) {
  return (
    <div className="form-check c-task">
      <input
        className="form-check-input"
        type="checkbox"
        disabled={task.completedAt}
        checked={task.completedAt}
        onChange={() => handleCompleteTask(task.id)}
      />
      <label className="form-check-label">{task.description}</label>
      {!task.completedAt && (
        <i
          className="btn-link bi bi-trash"
          onClick={() => handleDeleteTask(task.id)}
        ></i>
      )}
    </div>
  );
}

export default Task;
