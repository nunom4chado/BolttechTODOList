const projectRouter = require("express").Router();

const Project = require("../models/projectModel");

projectRouter.get("/", async (req, res) => {
  const projects = await Project.find({ owner: req.userId }).populate(
    "tasks",
    {}
  );
  res.json(projects);
});

projectRouter.post("/", async (req, res, next) => {
  const { title } = req.body;

  try {
    const project = new Project({
      title,
      owner: req.userId,
    });

    const savedProject = await project.save();

    res.status(201).json(savedProject);
  } catch (exception) {
    next(exception);
  }
});

projectRouter.put("/:id", async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      res.status(404).send({ message: "Project does not exist" });
      return;
    }

    if (project.owner.toString() !== req.userId) {
      res
        .status(401)
        .send({ message: "You are not the owner of this project" });
      return;
    }

    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    res.json(updatedProject);
  } catch (exception) {
    next(exception);
  }
});

projectRouter.delete("/:id", async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      res.status(404).send({ message: "Project does not exist" });
      return;
    }

    if (project.owner.toString() !== req.userId) {
      res
        .status(401)
        .send({ message: "You are not the owner of this project" });
      return;
    }

    await Project.findByIdAndRemove(req.params.id);
    res.status(204).end();
  } catch (exception) {
    next(exception);
  }
});

module.exports = projectRouter;
