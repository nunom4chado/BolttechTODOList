import { useState } from "react";
import projectService from "../../services/projectService";
import taskService from "../../services/taskService";
import Task from "../Task/Task";

function Project({ data, setProjects }) {
  const [newTitle, setNewTitle] = useState(data.title);
  const [editTitle, setEditTitle] = useState(false);
  const [newTask, setNewTask] = useState("");

  const tasksTodo = data.tasks.filter((task) => !task.completedAt);
  const completedTasks = data.tasks.filter((task) => task.completedAt);

  const handleChangeTitle = async () => {
    try {
      const response = await projectService.changeTitle(data.id, newTitle);
      setProjects((prev) =>
        prev.map((project) => {
          if (project.id === response.data.id) {
            project.title = response.data.title;
          }
          return project;
        })
      );
      setEditTitle(false);
    } catch (error) {
      console.log("error change title", error);
    }
  };

  const handleDeleteProject = async () => {
    try {
      await projectService.deleteProject(data.id);
      setProjects((prev) => prev.filter((project) => project.id !== data.id));
    } catch (error) {
      console.log("error deleting project", error);
    }
  };

  const handleCancel = () => {
    setNewTitle(data.title);
    setEditTitle(false);
  };

  const handleCreateTask = async () => {
    if (newTask) {
      const response = await taskService.createTask(data.id, newTask);
      setProjects((prev) =>
        prev.map((project) => {
          if (project.id === data.id) {
            project.tasks = [...project.tasks, response.data];
          }
          return project;
        })
      );
      setNewTask("");
    }
  };

  const handleCompleteTask = async (taskId) => {
    try {
      const response = await taskService.markCompleted(taskId);
      setProjects((prev) =>
        prev.map((project) => {
          if (project.id === data.id) {
            project.tasks.map((task) => {
              if (task.id === taskId) {
                task.completedAt = response.data.completedAt;
              }
              return task;
            });
          }
          return project;
        })
      );
    } catch (error) {
      console.log("error completing task", error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      const response = await taskService.deleteTask(taskId);
      console.log("delete task response", response);
      setProjects((prev) =>
        prev.map((project) => {
          if (project.id === data.id) {
            project.tasks = project.tasks.filter((task) => task.id !== taskId);
          }
          return project;
        })
      );
      console.log("deleting task", taskId);
    } catch (error) {
      console.log("error deleting task", error);
    }
  };

  return (
    <>
      <div className="card">
        <div className="card-header d-flex justify-content-between">
          <input
            style={{ border: "none", flex: 1 }}
            value={newTitle}
            disabled={!editTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <div>
            {editTitle ? (
              <>
                <i
                  className="btn btn-link p-1 bi bi-check-lg"
                  onClick={handleChangeTitle}
                ></i>
                <i
                  className="btn btn-link p-1 bi bi-x-lg"
                  onClick={handleCancel}
                ></i>
              </>
            ) : (
              <>
                <i
                  className="btn btn-link p-1 bi bi-pencil-fill"
                  onClick={() => setEditTitle(true)}
                ></i>
                <i
                  className="btn btn-link p-1 bi bi-trash"
                  onClick={handleDeleteProject}
                ></i>
              </>
            )}
          </div>
        </div>
        <div className="card-body">
          <h5 className="card-title">To Do</h5>
          {tasksTodo.length
            ? tasksTodo.map((task) => (
                <Task
                  key={task.id}
                  task={task}
                  handleCompleteTask={handleCompleteTask}
                  handleDeleteTask={handleDeleteTask}
                />
              ))
            : null}

          {completedTasks.length ? (
            <>
              <h5 className="card-title mt-4">Done</h5>
              {completedTasks.map((task) => (
                <Task key={task.id} task={task} />
              ))}
            </>
          ) : null}

          <hr />
          <div className="row">
            <div className="col">
              <input
                className="form-control"
                placeholder="Task"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
              />
            </div>
            <div className="col-auto">
              <button
                className="btn btn-success mb-3"
                onClick={handleCreateTask}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Project;
