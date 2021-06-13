import { useState } from "react";
import projectService from "../../services/projectService";

function CreateProject({ addProject }) {
  const [title, setTitle] = useState("");

  const handleCreateProject = async () => {
    try {
      const response = await projectService.createProject(title);
      addProject((prev) => [...prev, response.data]);
      setTitle("");
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  return (
    <div className="card bg-light">
      <div className="card-body mx-auto my-5" style={{ minWidth: "80%" }}>
        <div className="d-flex flex-column">
          <h5 className="card-title mb-2 text-center">Create New Project</h5>
          <input
            className="w-100 mb-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button
            className="btn btn-primary d-block"
            onClick={handleCreateProject}
          >
            Create Project
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateProject;
