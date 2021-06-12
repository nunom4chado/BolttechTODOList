const tasksRouter = require("express").Router();

const Task = require("../models/taskModel");
const Project = require("../models/projectModel");

tasksRouter.post("/", async (req, res, next) => {
  const { description, projectId } = req.body;

  if (!(description && projectId)) {
    res.status(400).send({
      message: "description and projectId are required",
    });
  }

  try {
    const project = await Project.findById(projectId);

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

    const task = new Task({
      description,
      createdAt: new Date(),
      completedAt: null,
      project: project._id,
    });

    const savedTask = await task.save();

    project.tasks = project.tasks.concat(savedTask._id);
    await project.save();

    res.status(201).json(savedTask);
  } catch (exception) {
    next(exception);
  }
});

tasksRouter.delete("/", async (req, res, next) => {
  const { taskId } = req.body;
  if (!taskId) {
    res.status(400).send({
      message: "taskId is required",
    });
  }

  try {
    const taskToDelete = await Task.findById(taskId).populate("project", {});

    if (taskToDelete.project.owner.toString() !== req.userId) {
      res.status(401).send({
        message: "You don't have permissions to perform this operation",
      });
      return;
    }

    if (taskToDelete.completedAt) {
      res.status(401).send({
        message: "You can't delete completed tasks",
      });
      return;
    }

    await Task.findByIdAndRemove(taskId);
    res.status(204).end();
  } catch (exception) {
    next(exception);
  }
});

tasksRouter.post("/complete", async (req, res, next) => {
  const { taskId } = req.body;
  if (!taskId) {
    res.status(400).send({
      message: "taskId is required",
    });
  }

  try {
    const taskToUpdate = await Task.findById(taskId).populate("project", {
      owner: 1,
    });

    if (taskToUpdate.project.owner.toString() !== req.userId) {
      res.status(401).send({
        message: "You don't have permissions to perform this operation",
      });
      return;
    }

    if (taskToUpdate.completedAt) {
      res.status(401).send({
        message: "You can't update completed tasks",
      });
      return;
    }

    taskToUpdate.completedAt = new Date();
    await taskToUpdate.save();

    res.status(204).end();
  } catch (exception) {
    next(exception);
  }
});

module.exports = tasksRouter;
