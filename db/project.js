var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var projectSchema = new Schema({
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  name: { type: String, default: null },
  description: { type: String, default: null },
  coverImage: { type: String, default: null },
  createdOn: { type: Date, default: new Date() },
  resources: [
    {
      name: { type: String, default: null },
      url: { type: String, default: null }
    }
  ],
  deadline: { type: Date, default: null },
  status: { type: String, default: "active" } // active, completed, stopped, deleted
})

var Project = mongoose.model('Project', projectSchema);
module.exports = Project;