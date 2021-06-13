import { useState } from "react";
import projectService from "../../services/projectService";

function Project({ data, setProjects }) {
  const [newTitle, setNewTitle] = useState(data.title);
  const [editTitle, setEditTitle] = useState(false);

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
          <h6 className="card-title">To Do</h6>
          {data?.tasks?.length
            ? data.tasks.map((task) => <p key={task.id}>{task.description}</p>)
            : null}

          <h6 className="card-title">Done</h6>

          <hr />
          <form className="row">
            <div className="col">
              <input className="form-control" placeholder="Task" />
            </div>
            <div className="col-auto">
              <button type="submit" className="btn btn-success mb-3">
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Project;
