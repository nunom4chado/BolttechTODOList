import { useState, useEffect } from "react";

import projectService from "../../services/projectService";
import CreateProject from "../CreateProject/CreateProject";
import Project from "../Project/Project";

function ProjectsView() {
  const [projects, setProjects] = useState([]);

  const fetchProjects = async () => {
    try {
      const response = await projectService.getProjects();
      console.log("projects", response.data);
      setProjects(response.data);
    } catch (error) {
      console.log(error.response?.data?.message);
    }
  };

  useEffect(() => {
    fetchProjects();
    return () => {
      setProjects([]);
    };
  }, []);

  return (
    <div className="container my-4">
      <div className="row">
        {projects.length
          ? projects.map((project) => (
              <div className="col-md-6 col-lg-4 mb-4" key={project.id}>
                <Project data={project} setProjects={setProjects} />
              </div>
            ))
          : null}
        <div className="col-md-6 col-lg-4 mb-4">
          <CreateProject addProject={setProjects} />
        </div>
      </div>
    </div>
  );
}

export default ProjectsView;
