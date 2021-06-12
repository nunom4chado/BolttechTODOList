const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  completedAt: Date,
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
  },
});

taskSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Task", taskSchema);
