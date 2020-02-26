var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var jobSchema = new Schema({
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdOn: { type: Date, default: new Date() },
  name: { type: String, default: null },
  description: { type: String, default: null },
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project", default: null }, // peut appartenir à 1 Project
  progress: { type: Number, min: 0, max: 100, default: 0 },
  type: { type: String, default: "learn" },
  resLink: [{ type: String, default: null }],
  resources: [{
    isFavorite: Boolean,
    url: String,
    name: String,
    service: String
  }],
  weekNumber: [{ type: Number, default: null }],
  deadline: { type: Date, default: null },
  status: { type: String, default: "active" }, // active, completed, stopped, deleted
  isInProgress: { type: Boolean, default: false },
  isNow: { type: Boolean, default: false }
})

var Job = mongoose.model('Job', jobSchema);
module.exports = Job;